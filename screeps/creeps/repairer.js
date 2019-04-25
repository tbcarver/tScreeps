
var debug = require("../debug");
var roomTools = require("../roomTools");

var repairer = {};

repairer.spawn = function(id) {

	var repairerMemory = {
		type: "repairer",
		state: "harvesting"
	}

	var result = spawn.spawnCreep([WORK, WORK, CARRY, MOVE], id, {
		memory: repairerMemory,
		energyStructures: roomTools.getAllEnergyStructures()
	});

	if (result === OK) {

		debug.highlight(`repairer spawning: ${id} memory: `, repairerMemory);

	} else {

		debug.warning(`repairer did not spawn: ${result}`);
	}
}

repairer.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		const target = creep.pos.findClosestByPath(FIND_SOURCES);

		if (target) {

			if (creep.harvest(target) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}

		} else {

			debug.warning("repairer cannot find any sources.");
		}
	}

	if (creep.memory.state === "repairing" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "repairing") {

			creep.memory.state = "repairing";
		}

		const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: structure => structure.hits < structure.hitsMax
		});

		if (target) {

			if (creep.repair(target) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}

		} else {

			debug.warning("repairer cannot find any damaged structures.");

			if (creep.transfer(global.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				creep.moveTo(global.controller);
			}
		}
	}
}


module.exports = repairer