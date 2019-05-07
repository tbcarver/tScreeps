
var creepsSpawnRules = {
	builders: 2,
	containerEnergizers: 10,
	controllerEnergizers: 10,
	defenders: 0,
	extensionEnergizers: 5,
	repairers: 2,
	spawnEnergizers: 2,
	wallRepairers: 2
}

var maxExtensionsPerEnergizer = 3;
var maxEnergizersPerContainer = 3;
var maxWaitingDefenders = 2;


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.maxExtensionsPerEnergizer = maxExtensionsPerEnergizer;
module.exports.maxEnergizersPerContainer = maxEnergizersPerContainer;
module.exports.maxWaitingDefenders = maxWaitingDefenders;