
var debug = require("../debug");
var findTools = require("../tools/findTools");

var builder = {};

builder.spawn = function(id) {

	var builderMemory = {
		type: "builder"
	}

	const sites = global.room.find(FIND_CONSTRUCTION_SITES);

	if (sites.length > 0) {

		var result = spawn.spawnCreep([WORK, WORK, CARRY, MOVE], id, {
			memory: builderMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {
	
			debug.highlight(`builder spawning: ${id} memory: `, builderMemory);
	
		} else {
	
			debug.warning(`builder did not spawn: ${result}`);
		}
	}
}

builder.act = function(creep) {

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

			debug.warning("builder resource not found");
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