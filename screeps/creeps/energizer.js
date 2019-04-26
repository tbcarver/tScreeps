
var debug = require("../debug");
var creepBase = require("./creepBase");
var findTools = require("../tools/findTools");

var energizer = {};

energizer.spawn = function(id, structureType) {

	var spawned = false;
	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var energizerMemory = {
		type: "energizer",
		structureType: structureType,
		structureId: ""
	}

	var structure;

	switch (structureType) {

		case STRUCTURE_SPAWN:

			structure = global.spawn;
			break;

		case STRUCTURE_CONTROLLER:

			structure = global.controller;
			break;
	}

	if (structure) {

		energizerMemory.structureId = structure.id;

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: energizerMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			spawned = true;
			debug.highlight(`energizer spawning: ${id} structure: ${structureType} memory: `, energizerMemory);

		} else {

			debug.warning(`energizer did not spawn: ${result}`);
		}
	}

	return spawned;
}

energizer.act = function(creep) {


	if (!creepBase.act(creep)) {

		if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

			if (creep.memory.state !== "harvesting") {

				creep.memory.state = "harvesting";
			}

			var resource = findTools.findClosestEnergy(creep.pos);

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

				debug.warning("energizer resource not found");
			}
		}

		if (creep.memory.state === "transferring" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

			if (creep.memory.state !== "transferring") {

				creep.memory.state = "transferring";
			}

			var structure = Game.getObjectById(creep.memory.structureId);


			// TODO: check for full and go harvest if energy cap is available

			if (structure) {

				if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

					creep.moveTo(structure);
				}

			} else {

				debug.danger("energizer structure not found:" + creep.memory.structureId);
			}
		}
	}
}

module.exports = energizer