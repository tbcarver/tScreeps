
var debug = require("../../debug");
var findTools = require("../../tools/findTools");

var controllerEnergizer = {};

controllerEnergizer.spawn = function(id, spawnResult) {

	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var controllerEnergizerMemory = {
		type: "controllerEnergizer"
	}

	var result = spawn.spawnCreep(bodyParts, id, {
		memory: controllerEnergizerMemory,
		energyStructures: findTools.findAllEnergyStructures()
	});

	if (result === OK) {

		spawnResult.spawned = true;
		debug.highlight(`controllerEnergizer spawning: ${id} memory: `, controllerEnergizerMemory);

	} else {

		debug.warning(`controllerEnergizer did not spawn: ${result}`);
	}

	return spawnResult;
}

controllerEnergizer.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var resource = findTools.findClosestEnergy(global.controller.pos);
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

			debug.warning("controllerEnergizer resource not found");
		}
	}

	if (creep.memory.state === "transferring" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var transferResult = creep.transfer(global.controller, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {

			creep.moveTo(global.controller);

		} else if (transferResult == ERR_FULL && creep.carry[RESOURCE_ENERGY] / creep.carryCapacity < .30) {

			creep.memory.state = "harvesting";
		}
	}
}

module.exports = controllerEnergizer