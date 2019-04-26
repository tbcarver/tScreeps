
var debug = require("../debug");
var findTools = require("../tools/findTools");
var coreArray = require("../../lib/core/extensions/coreArray");

var harvester = {};

harvester.spawn = function(id, resourceType, structureType) {

	var spawned = false;
	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var harvesterMemory = {
		type: "harvester",
		resourceType: resourceType,
		resourceId: "",
		structureType: structureType,
		structures: [{
			id: "",
			pos: undefined
		}],
		activeStructureIndex: 0
	}

	var structure;

	switch (structureType) {

		case STRUCTURE_EXTENSION:

			const maxExtensionsPerCreep = 2;

			var extensions = global.room.find(FIND_MY_STRUCTURES, {
				filter: {
					structureType: structureType
				}
			});

			extensions = extensions.filter(extension => {

				var occupiedPositions = getHarvesterStructurePositions(structureType);
				var isExtensionOccupied = occupiedPositions.some(occupiedPos => occupiedPos.x === extension.pos.x &&
					occupiedPos.y === extension.pos.y)

				return !isExtensionOccupied;
			});

			if (extensions.length > 0) {

				structure = extensions[0];
				harvesterMemory.structures[0].id = structure.id;
				harvesterMemory.structures[0].pos = structure.pos;
				bodyParts = [WORK, CARRY, CARRY, MOVE];

				for (var index = 1; index < maxExtensionsPerCreep; index++) {

					var nextExtension = structure.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: nextStructure => nextStructure.structureType == structureType &&
							nextStructure.id !== structure.id
					});

					if (nextExtension) {

						harvesterMemory.structures.push({
							id: nextExtension.id,
							pos: nextExtension.pos
						})
					}
				}
			}

			break;

		case STRUCTURE_CONTAINER:

			const maxCreepsPerContainer = 2;

			var containers = global.room.find(FIND_STRUCTURES, {
				filter: {
					structureType: structureType
				}
			});

			containers = containers.filter(extension => {

				var countStructures = countHarvesterStructuresAtPosition(structureType, extension.pos.x,
					extension.pos.y);

				return countStructures <= maxCreepsPerContainer;
			});

			if (containers.length > 0) {

				structure = containers[0];
				harvesterMemory.structures[0].id = structure.id;
				harvesterMemory.structures[0].pos = structure.pos;

				if (global.room.energyCapacityAvailable >= 400) {
					bodyParts = [WORK, CARRY, CARRY, MOVE, MOVE];
				}
			}

			break;
	}

	if (structure) {

		var resource;

		switch (resourceType) {

			case RESOURCE_ENERGY:

				resource = structure.pos.findClosestByPath(FIND_SOURCES);
				break;
		}

		if (resource) {

			harvesterMemory.resourceId = resource.id;

			var result = spawn.spawnCreep(bodyParts, id, {
				memory: harvesterMemory,
				energyStructures: findTools.findAllEnergyStructures()
			});

			if (result === OK) {

				spawned = true;
				debug.highlight(`harvester spawning: ${id} resource: ${resourceType} structure: ${structureType} memory: `, harvesterMemory);

			} else {

				debug.warning(`harvester did not spawn: ${result}`);
			}
		}
	}

	return spawned;
}

harvester.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[creep.memory.resourceType] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var resource = Game.getObjectById(creep.memory.resourceId);

		if (resource) {

			if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {

				creep.moveTo(resource);
			}

		} else {

			debug.danger("harvester structure not found: " + creep.memory.resourceId);
		}
	}

	if (creep.memory.state === "transferring" || creep.carry[creep.memory.resourceType] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var structure = Game.getObjectById(creep.memory.structures[creep.memory.activeStructureIndex].id);

		// debug.temp("creep.memory.activeStructureIndex", creep.memory.activeStructureIndex);
		// debug.temp("structure.id", structure.id);
		// debug.temp("structure", creep.memory.structures);
		if (structure) {

			var transferResult = creep.transfer(structure, creep.memory.resourceType);

			if (transferResult == ERR_NOT_IN_RANGE) {

				creep.moveTo(structure);

			} else if (transferResult == ERR_FULL) {

				if (creep.memory.structures.length > 1) {

					creep.memory.activeStructureIndex = coreArray.incrementArrayIndex(creep.memory.structures, creep.memory.activeStructureIndex);
					var transferResult = creep.transfer(structure, creep.memory.resourceType);

					if (transferResult == ERR_NOT_IN_RANGE) {

						creep.moveTo(structure);

					} else if (transferResult == ERR_FULL && creep.carry[creep.memory.resourceType] < creep.carryCapacity) {
						
						creep.memory.state = "harvesting";
					}
				}
			}

		} else {

			debug.danger("harvester structure not found: " + creep.memory.structures[0].id);
		}
	}
}

function countHarvesterStructuresAtPosition(structureType, x, y) {

	var result = _.reduce(Memory.creeps, (countStructures, creepMemory) => {

		if (creepMemory.type === "harvester") {

			positions = creepMemory.structures.forEach(structure => {

				if (creepMemory.structureType === structureType && structure.pos.x === x &&
					structure.pos.y === y) {
					countStructures++;
				}
			});
		}

		return countStructures;
	}, 0);

	return result;
}

function getHarvesterStructurePositions(structureType) {

	var result = _.reduce(Memory.creeps, (filteredPositions, creepMemory) => {

		if (creepMemory.type === "harvester" && creepMemory.structureType === structureType) {

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


module.exports = harvester