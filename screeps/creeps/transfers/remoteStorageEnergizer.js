
var BaseRemoteStorageEnergizer = require("./baseRemoteStorageEnergizer");

function RemoteStorageEnergizer(creep) {

	BaseRemoteStorageEnergizer.call(this, creep);
}

RemoteStorageEnergizer.prototype = Object.create(BaseRemoteStorageEnergizer.prototype);

RemoteStorageEnergizer.prototype.act = function() {

	BaseRemoteStorageEnergizer.prototype.act.call(this);
}

RemoteStorageEnergizer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "harvesting";
}

RemoteStorageEnergizer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "energizing";
}

RemoteStorageEnergizer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageEnergizer.prototype.harvest.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteStorageEnergizer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageEnergizer.prototype.energize.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteStorageEnergizer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageEnergizer.initializeSpawnCreepMemory("remoteStorageEnergizer", room);
}


module.exports = RemoteStorageEnergizer