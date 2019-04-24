
var debug = require("../debug");

var builder = {};

builder.spawn = function(id) {

	var result;
	var builderMemory = {
		type: "builder",
		state: "harvesting"
	}

	const target = global.room.find(FIND_CONSTRUCTION_SITES);

	if (target) {

		result = spawn.spawnCreep([WORK, WORK, CARRY, MOVE], id, { memory: builderMemory });
	}

	if (result === OK) {

		debug.highlight(`builder spawning: ${id} memory: `, builderMemory);

	} else {

		debug.danger(`builder not spawning: ${result}`);
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

			debug.danger("ERROR: builder cannot find any sources.");
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

			debug.danger("ERROR: builder cannot find any construction sites.");
		}
	}
}


module.exports = builder