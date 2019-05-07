
var debug = require("../../debug");
var bodyPartsFactory = require("../bodies/bodyPartsFactory");
var findTools = require("../../tools/findTools");
var { maxExtensionsPerEnergizer } = require("../../creepsRules");
var coreArray = require("../../../lib/core/extensions/coreArray");

var extensionEnergizer = {};

extensionEnergizer.spawn = function(id, creepsCurrentCount, spawnResult) {

	var extensionEnergizerMemory = {
		type: "extensionEnergizer",
		resourceId: "",
		structures: [{
			id: "",
			pos: {}
		}],
		activeStructureIndex: 0
	}

	var extensions = global.room.find(FIND_MY_STRUCTURES, {
		filter: {
			structureType: STRUCTURE_EXTENSION
		}
	});

	availableExtensions = extensions.filter(extension => {

		var occupiedPositions = getHarvesterStructurePositions(STRUCTURE_EXTENSION);
		var isExtensionOccupied = occupiedPositions.some(occupiedPos => occupiedPos.x === extension.pos.x &&
			occupiedPos.y === extension.pos.y)

		return !isExtensionOccupied;
	});

	if (availableExtensions.length > 0) {

		structure = availableExtensions[0];
		var nextExtension = structure;
		extensionEnergizerMemory.structures[0].id = structure.id;
		extensionEnergizerMemory.structures[0].pos = structure.pos;

		for (var index = 1; index < maxExtensionsPerEnergizer; index++) {

			nextExtension = nextExtension.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: nextStructure => nextStructure.structureType == STRUCTURE_EXTENSION &&
					_.map(availableExtensions, availableExtension => availableExtension.id).includes(nextStructure.id) &&
					!_.map(extensionEnergizerMemory.structures, structure => structure.id).includes(nextStructure.id)
			});

			if (nextExtension) {

				extensionEnergizerMemory.structures.push({
					id: nextExtension.id,
					pos: nextExtension.pos
				})
			}
		}
	}

	var resource = structure.pos.findClosestByRange(FIND_SOURCES);

	if (extensionEnergizerMemory.structures.length > 0 && resource) {

		extensionEnergizerMemory.resourceId = resource.id;
		var bodyParts = bodyPartsFactory.getBodyParts("energizer");

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: extensionEnergizerMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			spawnResult.spawned = true;
			debug.highlight(`extensionEnergizer spawning: ${id} memory: `, extensionEnergizerMemory);

		} else {

			debug.warning(`extensionEnergizer did not spawn: ${result}`);
		}
	} else {

		debug.warning(`extensionEnergizer did not spawn no resources found`);
	}

	return spawnResult;
}

extensionEnergizer.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var resource = findTools.findClosestEnergy(global.spawn.pos);

		if (resource) {

			if (creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				creep.moveTo(resource);
			}

		} else {

			resource = Game.getObjectById(creep.memory.resourceId);

			if (resource) {

				if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {

					creep.moveTo(resource);
				}

			} else {

				debug.danger("extensionEnergizer structure not found: " + creep.memory.resourceId);
			}
		}
	}

	if (creep.memory.state === "transferring" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var structure = Game.getObjectById(creep.memory.structures[creep.memory.activeStructureIndex].id);

		if (structure) {

			var transferResult = creep.transfer(structure, RESOURCE_ENERGY);

			if (transferResult == ERR_NOT_IN_RANGE) {

				creep.moveTo(structure);

			} else if (transferResult == ERR_FULL) {

				if (creep.memory.structures.length > 1) {

					creep.memory.activeStructureIndex = coreArray.incrementArrayIndex(creep.memory.structures, creep.memory.activeStructureIndex);
					var transferResult = creep.transfer(structure, RESOURCE_ENERGY);

					if (transferResult == ERR_NOT_IN_RANGE) {

						creep.moveTo(structure);
					}
				}

				if (transferResult == ERR_FULL && creep.carry[RESOURCE_ENERGY] / creep.carryCapacity < .30) {

					creep.memory.state = "harvesting";
				}
			}
		} else {

			debug.danger("extensionEnergizer structure not found: " + creep.memory.structures[0].id);
		}
	}
}

function getHarvesterStructurePositions(structureType) {

	var result = _.reduce(Memory.creeps, (filteredPositions, creepMemory) => {

		if (creepMemory.type === "extensionEnergizer") {

			positions = creepMemory.structures.reduce((structurePositions, structure) => {

				structurePositions.push(structure.pos);

				return structurePositions;
			}, []);

			filteredPositions.push(...positions);
		}

		return filteredPositions;
	}, []);

	return result;
}


module.exports = extensionEnergizer