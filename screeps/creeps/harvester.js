
var debug = require("../debug");
var spawnTools = require("../tools/spawnTools");
var findTools = require("../tools/findTools");
var { harvesterRules } = require("../creepsRules");
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

				for (var index = 1; index < harvesterRules.maxExtensionsPerCreep; index++) {

					var nextExtension = structure.pos.findClosestByRange(FIND_STRUCTURES, {
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

				bodyParts = [WORK, CARRY, CARRY, MOVE];

				var spawnCapacity = spawnTools.calculateSpawnCapacity();

				if (spawnCapacity >= 400) {
					bodyParts = [WORK, CARRY, CARRY, MOVE, MOVE];
				}

				if (spawnCapacity >= 600) {
					bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
				}
			}

			break;

		case STRUCTURE_CONTAINER:

			var containers = global.room.find(FIND_STRUCTURES, {
				filter: {
					structureType: structureType
				}
			});

			containers = containers.filter(container => {

				var countStructures = countHarvesterStructuresAtPosition(structureType, container.pos.x,
					container.pos.y);

				return countStructures < harvesterRules.maxCreepsPerContainer;
			});

			if (containers.length > 0) {

				structure = containers[0];
				harvesterMemory.structures[0].id = structure.id;
				harvesterMemory.structures[0].pos = structure.pos;

				var spawnCapacity = spawnTools.calculateSpawnCapacity();

				if (global.room.energyCapacityAvailable >= 400) {
					bodyParts = [WORK, CARRY, CARRY, MOVE, MOVE];
				}

				if (global.room.energyCapacityAvailable >= 600) {
					bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
				}
			}

			break;
	}

	if (structure) {

		var resource;

		switch (resourceType) {

			case RESOURCE_ENERGY:

				resource = structure.pos.findClosestByRange(FIND_SOURCES);
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

		if (creep.memory.structureType === STRUCTURE_CONTAINER) {

			resource = Game.getObjectById(creep.memory.resourceId);

			if (resource) {

				if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {

					creep.moveTo(resource);
				}

			} else {

				debug.danger("harvester structure not found: " + creep.memory.resourceId);
			}

		} else {

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

					debug.danger("harvester structure not found: " + creep.memory.resourceId);
				}
			}
		}
	}

	if (creep.memory.state === "alternateTransferring") {

		var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_CONTAINER &&
				structure.store[RESOURCE_ENERGY] / structure.storeCapacity < .80
		});

		debug.warning("harvester transferring to alternate container");

		if (creep.transfer(container, creep.memory.resourceType) == ERR_NOT_IN_RANGE) {

			creep.moveTo(container);
		}

	} if (creep.memory.state === "transferring" || creep.carry[creep.memory.resourceType] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var structure = Game.getObjectById(creep.memory.structures[creep.memory.activeStructureIndex].id);

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
					}
				}

				if (transferResult == ERR_FULL && creep.carry[creep.memory.resourceType] / creep.carryCapacity < .30) {

					creep.memory.state = "harvesting";

				} else if (transferResult == ERR_FULL && creep.memory.structureType === STRUCTURE_CONTAINER) {

					creep.memory.state = "alternateTransferring";
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