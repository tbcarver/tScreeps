
var debug = require("../../debug");
var bodyPartsFactory = require("../bodies/bodyPartsFactory");
var findTools = require("../../tools/findTools");

var spawnEnergizer = {};

spawnEnergizer.spawn = function(id, creepsCurrentCount, spawnResult) {

	var bodyParts = bodyPartsFactory.getBodyParts("energizer");
	var spawnEnergizerMemory = {
		type: "spawnEnergizer"
	}

	var result = spawn.spawnCreep(bodyParts, id, {
		memory: spawnEnergizerMemory,
		energyStructures: findTools.findAllEnergyStructures()
	});

	if (result === OK) {

		spawnResult.spawned = true;
		debug.highlight(`spawnEnergizer spawning: ${id} memory: `, spawnEnergizerMemory);

	} else {

		debug.warning(`spawnEnergizer did not spawn: ${result}`);
	}

	return spawnResult;
}

spawnEnergizer.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var resource = findTools.findClosestEnergy(global.spawn.pos);
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

			debug.warning("spawnEnergizer resource not found");
		}
	}

	if (creep.memory.state === "transferring" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var transferResult = creep.transfer(global.spawn, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {

			creep.moveTo(global.spawn);

		} else if (transferResult == ERR_FULL && creep.carry[RESOURCE_ENERGY] / creep.carryCapacity < .30) {

			creep.memory.state = "harvesting";
		}
	}
}

module.exports = spawnEnergizer