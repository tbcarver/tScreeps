
var debug = require("../debug");
var creepBase = require("./creepBase");
var spawnTools = require("../tools/spawnTools");
var findTools = require("../tools/findTools");

var wallRepairer = {};

wallRepairer.spawn = function(id) {

	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var wallRepairerMemory = {
		type: "wallRepairer"
	}

	var spawnCapacity = spawnTools.calculateSpawnCapacity();

	if (spawnCapacity >= 400) {
		bodyParts = [WORK, WORK, CARRY, MOVE, MOVE];
	}

	if (spawnCapacity >= 600) {
		bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
	}

	const targets = global.room.find(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_WALL
	});

	if (targets.length > 0) {

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: wallRepairerMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			debug.highlight(`wallRepairer spawning: ${id} memory: `, wallRepairerMemory);

		} else {

			debug.warning(`wallRepairer did not spawn: ${result}`);
		}
	}
}

wallRepairer.act = function(creep) {

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

			debug.warning("wallRepairer resource not found");
		}
	}

	if (creep.memory.state === "repairing" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "repairing") {

			creep.memory.state = "repairing";
		}

		var target;

		for (var count = 1; count <= 50; count++) {

			target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => structure.structureType === STRUCTURE_WALL &&
					structure.hits < (2000 * count)
			});

			if (target) {
				break;
			}
		}

		if (target) {

			if (creep.repair(target) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}

		} else {

			debug.warning(`wallRepairer cannot find any walls. ticks: ${creep.ticksToLive}`);

			if (creep.transfer(global.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				creep.moveTo(global.controller);
			}
		}
	}
}


module.exports = wallRepairer