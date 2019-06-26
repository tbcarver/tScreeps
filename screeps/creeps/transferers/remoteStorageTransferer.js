
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

function RemoteStorageTransferer(creep) {

	BaseRemoteStorageTransferer.call(this, creep);
}

RemoteStorageTransferer.prototype = Object.create(BaseRemoteStorageTransferer.prototype);

RemoteStorageTransferer.prototype.act = function() {

	BaseRemoteStorageTransferer.prototype.act.call(this);
}

RemoteStorageTransferer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "harvesting";
}

RemoteStorageTransferer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "transferring";
}

RemoteStorageTransferer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.harvest.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteStorageTransferer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteStorageTransferer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteStorageTransferer", room);
}


module.exports = RemoteStorageTransferer