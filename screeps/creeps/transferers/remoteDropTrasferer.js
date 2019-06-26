
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

function RemoteDropTransferer(creep) {
	
	if (this.state === "movingToSpawnedRoom") {
		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
		if (dropFlag) {
			this.state = "transferring";
		}
	}

	BaseRemoteStorageTransferer.call(this, creep);
}

RemoteDropTransferer.prototype = Object.create(BaseRemoteStorageTransferer.prototype);

RemoteDropTransferer.prototype.act = function() {

	BaseRemoteStorageTransferer.prototype.act.call(this);
}

RemoteDropTransferer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "energizing";
}

RemoteDropTransferer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteDropTransferer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteDropTransferer.prototype.remoteRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
}

RemoteDropTransferer.prototype.unknownRoomAct = function() {

	var acted = false;

	if (this.state === "transferring") {
		
		this.spawnedRoomAct();
		acted = true;
	}

	return acted;
}

RemoteDropTransferer.initializeSpawnCreepMemory = function(room) {

	return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteSpawnedStorageTransferer", room);
}


module.exports = RemoteDropTransferer