
var debug = require("../debug");

var creep = {};

creep.act = function() {

}

creep.getNextCreepNumber = function() {

	if (!Memory.creepNumber) {

		Memory.creepNumber = 1;
	}

	var creepNumber = parseInt(Memory.creepNumber);
	creepNumber++

	Memory.creepNumber = creepNumber;

	return creepNumber;
}

creep.cleanTheDead = function() {

	var creep;
	var creepNames = Object.keys(Game.creeps);
	var memoryCreepNames = Object.keys(Memory.creeps);


	for (var memoryCreepName of memoryCreepNames) {

		if (!creepNames.includes(memoryCreepName)) {

			delete Memory.creeps[memoryCreepName];
		}
	}
}

module.exports = creep