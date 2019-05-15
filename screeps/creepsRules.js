
var creepsSpawnRules = {
	builders: 4,
	containerHarvesters: 3,
	controllerEnergizers: 8,
	defenders: 0,
	dropContainerHarvesters: 2,
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