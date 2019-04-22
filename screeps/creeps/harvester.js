
var debug = require("../debug");
var coreMath = require("../../lib/core/extensions/coreMath")

var harvester = {};

harvester.spawn = function(id, resourceType, targetStucture) {

	var harvesterMemory = {
		type: "harvester",
		resourceType: resourceType,
		resourceId: "",
		targetStucture: targetStucture,
		targetId: ""
	}

	switch (resourceType) {

		case "energy":

			var sources = global.room.find(FIND_SOURCES);
			var randomIndex = coreMath.randomInteger(0, sources.length - 1);

			harvesterMemory.resourceId = sources[randomIndex].id;
			break;
	}

	switch (targetStucture) {
		case "spawn":

			harvesterMemory.targetId = global.spawn.id;
			break;

		case "controller":

			harvesterMemory.targetId = global.controller.id;
			break;
	}

	if (harvesterMemory.resourceId && harvesterMemory.targetStucture) {

		var result = spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], id, { memory: harvesterMemory });

		if (result === OK) {

			debug.yellow(`harvester spawning: ${id} resource: ${resourceType} storage: ${targetStucture} memory: `, harvesterMemory);

		} else {

			debug.red(`pather not spawning: ${result}`);
		}
	}
}

harvester.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var resource = Game.getObjectById(creep.memory.resourceId);

		if (resource) {

			if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {

				creep.moveTo(resource);
			}

		} else {

			debug("ERROR: Harvester resource not found for id: " + creep.memory.resourceId);
		}
	}

	if (creep.memory.state === "transferring" || creep.carry[creep.memory.resourceType] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var target = Game.getObjectById(creep.memory.targetId);

		if (target) {

			if (creep.transfer(target, creep.memory.resourceType) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}

		} else {

			debug("ERROR: Harvester target not found for id: " + creep.memory.targetId);
		}
	}
}


module.exports = harvester