
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

function RemoteStorageEnergizer(creep) {

	BaseRemoteStorageTransferer.call(this, creep);
}

RemoteStorageEnergizer.prototype = Object.create(BaseRemoteStorageTransferer.prototype);

RemoteStorageEnergizer.prototype.act = function() {

	BaseRemoteStorageTransferer.prototype.act.call(this);
}

RemoteStorageEnergizer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "harvesting";
}

RemoteStorageEnergizer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "transferring";
}

RemoteStorageEnergizer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.harvest.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteStorageEnergizer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.energize.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteStorageEnergizer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteStorageEnergizer", room);
}


module.exports = RemoteStorageEnergizer