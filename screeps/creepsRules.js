
var creepsSpawnRules = {
	builders: 4,
	containerHarvesters: 3,
	controllerEnergizers: 0,
	defenders: 0,
	dropContainerHarvesters: 2,
	extensionEnergizers: 5,
	repairers: 2,
	spawnEnergizers: 0,
	wallRepairers: 0
}

var maxExtensionsPerEnergizer = 3;
var maxEnergizersPerContainer = 3;
var maxWaitingDefenders = 2;


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.maxExtensionsPerEnergizer = maxExtensionsPerEnergizer;
module.exports.maxEnergizersPerContainer = maxEnergizersPerContainer;
module.exports.maxWaitingDefenders = maxWaitingDefenders;