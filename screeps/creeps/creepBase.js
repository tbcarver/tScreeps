
var debug = require("../debug");

var creepBase = {};

creepBase.spawn = function(inherited, ...args) {
	
	var id = getNextCreepId();
	var waitForSpawn = inherited.spawn(id, ...args);

	return waitForSpawn;
}

creepBase.act = function(creep, inherited) {

	if (creep.ticksToLive < 50) {
				
		if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			creep.moveTo(structure);
		}
	} else {

		inherited.act(creep);
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