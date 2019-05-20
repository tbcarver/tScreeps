
var creepsSpawnRules = {
	builder: 2,
	containerHarvester: 3,
	controllerEnergizer: 4,
	defender: 0,
	dropContainerHarvester: 2,
	extensionEnergizer: 4,
	remoteBuilder: 1,
	remoteHarvester: 1,
	repairer: 2,
	spawnEnergizer: 2,
	storageEnergizer: 0,
	wallRepairer: 1
}

var maxExtensionsPerEnergizer = 3;
var maxEnergizersPerContainer = 3;
var canEnergizersHarvest = false;

var maxWaitingDefenders = 2;

var remoteRoomName = "W6S1";


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.maxExtensionsPerEnergizer = maxExtensionsPerEnergizer;
module.exports.maxEnergizersPerContainer = maxEnergizersPerContainer;
module.exports.maxWaitingDefenders = maxWaitingDefenders;
module.exports.remoteRoomName = remoteRoomName;