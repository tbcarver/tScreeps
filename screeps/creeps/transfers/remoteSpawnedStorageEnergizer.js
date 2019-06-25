
var BaseRemoteStorageEnergizer = require("./baseRemoteStorageEnergizer");

function RemoteSpawnedStorageEnergizer(creep) {

	BaseRemoteStorageEnergizer.call(this, creep);
}

RemoteSpawnedStorageEnergizer.prototype = Object.create(BaseRemoteStorageEnergizer.prototype);

RemoteSpawnedStorageEnergizer.prototype.act = function() {

	BaseRemoteStorageEnergizer.prototype.act.call(this);
}

RemoteSpawnedStorageEnergizer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "energizing";
}

RemoteSpawnedStorageEnergizer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedStorageEnergizer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageEnergizer.prototype.energize.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteSpawnedStorageEnergizer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageEnergizer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteSpawnedStorageEnergizer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageEnergizer.initializeSpawnCreepMemory("remoteSpawnedStorageEnergizer", room);
}


module.exports = RemoteSpawnedStorageEnergizer