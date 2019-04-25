
var debug = require("../debug");
var roomTools = require("../roomTools");

var builder = {};

builder.spawn = function(id) {

	var result;
	var builderMemory = {
		type: "builder",
		state: "harvesting"
	}

	const sites = global.room.find(FIND_CONSTRUCTION_SITES);

	if (sites.length > 0) {

		var result = spawn.spawnCreep([WORK, WORK, CARRY, MOVE], id, {
			memory: builderMemory,
			energyStructures: roomTools.getAllEnergyStructures()
		});
	}

	if (result === OK) {

		debug.highlight(`builder spawning: ${id} memory: `, builderMemory);

	} else {

		debug.warning(`builder did not spawn: ${result}`);
	}
}

builder.act = function(creep) {

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

			debug.warning(`builder cannot find any sources. ticks: ${creep.ticksToLive}`);
		}
	}

	if (creep.memory.state === "building" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "building") {

			creep.memory.state = "building";
		}

		const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

		if (target) {

			if (creep.build(target) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}

		} else {

			debug.warning(`builder cannot find any construction sites. ticks: ${creep.ticksToLive}`);

			if (creep.transfer(global.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				creep.moveTo(global.controller);
			}
		}
	}
}


module.exports = builder