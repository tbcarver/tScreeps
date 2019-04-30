
var debug = require("../debug");
var findTools = require("../tools/findTools");

var creepBase = {};

creepBase.spawn = function(inheritedCreep, ...args) {

	var spawnResult = {
		waitForSpawn: false,
		spawned: false
	};

	var id = getNextCreepId();
	spawnResult = inheritedCreep.spawn(id, spawnResult, ...args);

	return spawnResult;
}

creepBase.act = function(inheritedCreep, creep) {

	if (creep.ticksToLive < 25) {

		if (creep.carry[RESOURCE_ENERGY] === 0) {

			creep.moveTo(target);

		} else {

			var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
					structure.store[RESOURCE_ENERGY] > 200
			});

			if (!target) {
				target = global.controller;
			}

			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}
		}
	} else {

		inheritedCreep.act(creep);
	}

	var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

	if (droppedEnergy) {
		creep.pickup(droppedEnergy);
	}
}

function getNextCreepId() {

	if (!Memory.nextCreepId) {

		Memory.nextCreepId = 1;
	}

	var nextCreepId = parseInt(Memory.nextCreepId);
	nextCreepId++

	Memory.nextCreepId = nextCreepId;

	return nextCreepId;
}


module.exports = creepBase