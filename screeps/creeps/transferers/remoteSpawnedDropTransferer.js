
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

function RemoteSpawnedDropTransferer(creep) {

	BaseRemoteStorageTransferer.call(this, creep);
}

RemoteSpawnedDropTransferer.prototype = Object.create(BaseRemoteStorageTransferer.prototype);

RemoteSpawnedDropTransferer.prototype.act = function() {
	
	if (this.state === "movingToSpawnedRoom") {
		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
		if (dropFlag) {
			this.state = "transferring";
		}
	}

	BaseRemoteStorageTransferer.prototype.act.call(this);
}

RemoteSpawnedDropTransferer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "transferring";
}

RemoteSpawnedDropTransferer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedDropTransferer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteSpawnedDropTransferer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteSpawnedDropTransferer.prototype.unknownRoomAct = function() {

	var acted = false;

	if (this.state === "transferring") {
		
		this.spawnedRoomAct();
		acted = true;
	}

	return acted;
}

RemoteSpawnedDropTransferer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteSpawnedDropTransferer", room);
}


module.exports = RemoteSpawnedDropTransferer