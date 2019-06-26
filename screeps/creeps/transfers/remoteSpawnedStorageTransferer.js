
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

function RemoteSpawnedStorageTransferer(creep) {

	BaseRemoteStorageTransferer.call(this, creep);
}

RemoteSpawnedStorageTransferer.prototype = Object.create(BaseRemoteStorageTransferer.prototype);

RemoteSpawnedStorageTransferer.prototype.act = function() {

	BaseRemoteStorageTransferer.prototype.act.call(this);
}

RemoteSpawnedStorageTransferer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "transferring";
}

RemoteSpawnedStorageTransferer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedStorageTransferer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteSpawnedStorageTransferer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteSpawnedStorageTransferer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteSpawnedStorageTransferer", room);
}


module.exports = RemoteSpawnedStorageTransferer