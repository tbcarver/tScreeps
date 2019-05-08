
var debug = require("../../debug");
var bodyPartsFactory = require("../bodies/bodyPartsFactory");
var findTools = require("../../tools/findTools");
var { maxEnergizersPerContainer } = require("../../creepsRules");

var containerEnergizer = {};

containerEnergizer.spawn = function(id, creepsCurrentCount, spawnResult) {

	var containerEnergizerMemory = {
		type: "containerEnergizer",
		resourceId: "",
		structureId: "",
		structurePos: {}
	}

	var structure;

	// Evenly distribute creeps to each container up to the max creeps per container
	for (var energizersPerContainer = 1; energizersPerContainer <= maxEnergizersPerContainer; energizersPerContainer++) {

		var containers = global.room.find(FIND_STRUCTURES, {
			filter: {
				structureType: STRUCTURE_CONTAINER
			}
		});

		containers = containers.filter(container => {

			var countEnergizers = countContainerEnergizersAtStructurePosition(container.pos.x, container.pos.y);

			return countEnergizers < energizersPerContainer;
		});
		
		if (containers.length > 0) {

			structure = containers[0];
			containerEnergizerMemory.structureId = structure.id;
			containerEnergizerMemory.structurePos = structure.pos;

			break;
		}
	}

	if (structure) {

		var resource = structure.pos.findClosestByRange(FIND_SOURCES);

		if (resource) {

			containerEnergizerMemory.resourceId = resource.id;
			var bodyParts = bodyPartsFactory.getBodyParts("energizer");

			var result = spawn.spawnCreep(bodyParts, id, {
				memory: containerEnergizerMemory,
				energyStructures: findTools.findAllEnergyStructures()
			});

			if (result === OK) {

				spawnResult.spawned = true;
				debug.highlight(`containerEnergizer spawning: ${id} memory: `, containerEnergizerMemory);

			} else {

				debug.warning(`containerEnergizer did not spawn: ${result}`);
			}
		} else {

			debug.warning(`containerEnergizer did not spawn no resources found`);
		}
	}

	return spawnResult;
}

containerEnergizer.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		resource = Game.getObjectById(creep.memory.resourceId);

		if (resource) {

			if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {

				creep.moveTo(resource);
			}

		} else {

			debug.danger("containerEnergizer structure not found: " + creep.memory.resourceId);
		}
	}

	if (creep.memory.state === "alternateTransferring") {

		var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_CONTAINER &&
				structure.store[RESOURCE_ENERGY] / structure.storeCapacity < .80
		});

		if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			creep.moveTo(container);
		}

	} else if (creep.memory.state === "transferring" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var structure = Game.getObjectById(creep.memory.structureId);

		if (structure) {

			var transferResult = creep.transfer(structure, RESOURCE_ENERGY);

			if (transferResult == ERR_NOT_IN_RANGE) {

				creep.moveTo(structure);

			} else if (transferResult == ERR_FULL && creep.carry[RESOURCE_ENERGY] / creep.carryCapacity < .30) {


				creep.memory.state = "harvesting";

			} else if (transferResult == ERR_FULL) {

				creep.memory.state = "alternateTransferring";
			}
		} else {

			debug.danger("containerEnergizer structure not found: " + creep.memory.structureId);
		}
	}
}

function countContainerEnergizersAtStructurePosition(x, y) {

	var result = _.reduce(Memory.creeps, (countStructures, creepMemory) => {

		if (creepMemory.type === "containerEnergizer") {

			if (creepMemory.structurePos.x === x && creepMemory.structurePos.y === y) {
				countStructures++;
			}
		}

		return countStructures;
	}, 0);

	return result;
}


module.exports = containerEnergizer