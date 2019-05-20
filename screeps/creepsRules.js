
var creepsSpawnRules = {
	builder: 2,
	containerHarvester: 3,
	controllerEnergizer: 4,
	defender: 0,
	dropContainerHarvester: 2,
	extensionEnergizer: 4,
	remoteHarvester: 1,
	repairer: 2,
	spawnEnergizer: 2,
	wallRepairer: 1
}

var maxExtensionsPerEnergizer = 3;
var maxEnergizersPerContainer = 3;
var maxWaitingDefenders = 2;

var remoteRoomName = "W6S1";


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.maxExtensionsPerEnergizer = maxExtensionsPerEnergizer;
module.exports.maxEnergizersPerContainer = maxEnergizersPerContainer;
module.exports.maxWaitingDefenders = maxWaitingDefenders;
module.exports.remoteRoomName = remoteRoomName;