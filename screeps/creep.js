
var creep = {};

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


}

module.exports = creep