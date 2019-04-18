
var creepsStore = {};

creepsStore.remove = function(creep) {

	delete Memory.creeps[creep.name];
}

creepsStore.getNextCreepId = function() {

	if (!Memory.nextCreepId) {

		Memory.nextCreepId = 1;
	}

	var nextCreepId = parseInt(Memory.nextCreepId);
	nextCreepId++

	Memory.nextCreepId = nextCreepId;

	return nextCreepId;
}


module.exports = creepsStore;