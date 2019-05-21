
var creepsSpawnRules = {
	builder: 4,
	containerHarvester: 2,
	controllerEnergizer: 1,
	defender: 0,
	dropContainerHarvester: 4,
	extensionEnergizer: 5,
	remoteClaimer: 0,
	remoteHarvester: 2,
	repairer: 2,
	spawnEnergizer: 1,
	storageEnergizer: 2,
	wallRepairer: 1
}

var remoteCreepsSpawnRules = {
	builder: 4,
	containerHarvester: 0,
	controllerEnergizer: 1,
	defender: 0,
	dropContainerHarvester: 0,
	extensionEnergizer: 0,
	repairer: 1,
	spawnEnergizer: 1,
	storageEnergizer: 0,
	wallRepairer: 0
}

var maxExtensionsPerEnergizer = 3;
var maxEnergizersPerContainer = 3;
var canEnergizersHarvest = false;

var maxWaitingDefenders = 2;

var remoteRoomName = "W6S1";


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.remoteCreepsSpawnRules = remoteCreepsSpawnRules;
module.exports.maxExtensionsPerEnergizer = maxExtensionsPerEnergizer;
module.exports.maxEnergizersPerContainer = maxEnergizersPerContainer;
module.exports.canEnergizersHarvest = canEnergizersHarvest;
module.exports.maxWaitingDefenders = maxWaitingDefenders;
module.exports.remoteRoomName = remoteRoomName;