
var debug = require("../../debug");
var spawnTools = require("../../tools/spawnTools");
var findTools = require("../../tools/findTools");
var { maxExtensionsPerEnergizer } = require("../../creepsRules");
var coreArray = require("../../../lib/core/extensions/coreArray");

var extensionEnergizer = {};

extensionEnergizer.spawn = function(id, spawnResult) {

	var bodyParts = [WORK, CARRY, MOVE, MOVE];
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
			structureType: STRUCTURE_CONTROLLER
		}
	});

	extensions = extensions.filter(extension => {

		var occupiedPositions = getHarvesterStructurePositions(STRUCTURE_CONTROLLER);
		var isExtensionOccupied = occupiedPositions.some(occupiedPos => occupiedPos.x === extension.pos.x &&
			occupiedPos.y === extension.pos.y)

		return !isExtensionOccupied;
	});

	if (extensions.length > 0) {

		structure = extensions[0];
		extensionEnergizerMemory.structures[0].id = structure.id;
		extensionEnergizerMemory.structures[0].pos = structure.pos;

		for (var index = 1; index < maxExtensionsPerEnergizer; index++) {

			var nextExtension = structure.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: nextStructure => nextStructure.structureType == STRUCTURE_CONTROLLER &&
					nextStructure.id !== structure.id
			});

			if (nextExtension) {

				extensionEnergizerMemory.structures.push({
					id: nextExtension.id,
					pos: nextExtension.pos
				})
			}
		}

		bodyParts = [WORK, CARRY, CARRY, MOVE];

		var spawnCapacity = spawnTools.calculateSpawnCapacity();

		if (spawnCapacity >= 400) {
			bodyParts = [WORK, CARRY, CARRY, MOVE, MOVE];
		}

		if (spawnCapacity >= 600) {
			bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
		}
	}

	var resource = structure.pos.findClosestByRange(FIND_SOURCES);

	if (resource) {

		extensionEnergizerMemory.resourceId = resource.id;

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

		var resource = creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
				structure.store[RESOURCE_ENERGY] > 800 && findTools.isInRange(creep.pos, structure.pos, 15)
		});

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

		if (creepMemory.type === "extensionEnergizer" && creepMemory.structureType === structureType) {

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