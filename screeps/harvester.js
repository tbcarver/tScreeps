
var harvester = {};

harvester.createHarvesters = function() {

	if (!spawn.spawning && spawn.energy >= 300) {

		spawn.createCreep([WORK, CARRY, MOVE], null, {role: 'harvester'});
	  }
}

harvester.harvest = function() {

	
}

module.exports = harvester