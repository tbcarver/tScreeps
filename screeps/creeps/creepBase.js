
var debug = require("../debug");
var findTools = require("../tools/findTools");

var creepBase = {};

creepBase.spawn = function(inherited, ...args) {

	var id = getNextCreepId();
	var waitForSpawn = inherited.spawn(id, ...args);

	return waitForSpawn;
}

creepBase.act = function(inherited, creep) {

	if (creep.ticksToLive < 50) {

		if (creep.transfer(global.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			creep.moveTo(global.controller);
		}
	} else {

		inherited.act(creep);
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