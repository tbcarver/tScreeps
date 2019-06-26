
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

function RemoteSpawnedStorageEnergizer(creep) {

	BaseRemoteStorageTransferer.call(this, creep);
}

RemoteSpawnedStorageEnergizer.prototype = Object.create(BaseRemoteStorageTransferer.prototype);

RemoteSpawnedStorageEnergizer.prototype.act = function() {

	BaseRemoteStorageTransferer.prototype.act.call(this);
}

RemoteSpawnedStorageEnergizer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "transferring";
}

RemoteSpawnedStorageEnergizer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedStorageEnergizer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.energize.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteSpawnedStorageEnergizer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteSpawnedStorageEnergizer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteSpawnedStorageEnergizer", room);
}


module.exports = RemoteSpawnedStorageEnergizer