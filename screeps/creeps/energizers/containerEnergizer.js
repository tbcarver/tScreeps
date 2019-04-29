
var debug = require("../debug");
var findTools = require("../tools/findTools");

var containerEnergizer = {};

containerEnergizer.spawn = function(id) {

	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var containerEnergizerMemory = {
		type: "containerEnergizer"
	}

	containerEnergizerMemory.structureId = structure.id;

	var result = spawn.spawnCreep(bodyParts, id, {
		memory: containerEnergizerMemory,
		energyStructures: findTools.findAllEnergyStructures()
	});

	if (result === OK) {

		debug.highlight(`containerEnergizer spawning: ${id} memory: `, containerEnergizerMemory);

	} else {

		debug.warning(`containerEnergizer did not spawn: ${result}`);
	}
}

containerEnergizer.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var structure = Game.getObjectById(creep.memory.structureId);
		var resource = findTools.findClosestEnergy(structure.pos);
		// TODO: once found stick with it unless it is a container that is empty

		if (resource) {

			if (resource.structureType) {

				if (creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(resource);
				}

			} else {

				if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {
					creep.moveTo(resource);
				}
			}
		} else {

			debug.warning("containerEnergizer resource not found");
		}
	}

	if (creep.memory.state === "transferring" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

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
			}

		} else {

			debug.danger("containerEnergizer structure not found:" + creep.memory.structureId);
		}
	}
}

module.exports = containerEnergizer