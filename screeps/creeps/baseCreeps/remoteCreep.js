
var enemyTools = require("../../tools/enemyTools");

var BaseCreep = require("./baseCreep");

/** @param {Creep} creep */
function RemoteCreep(creep) {

	BaseCreep.call(this, creep);

	this.suppressReturnToRooms = true;
}

RemoteCreep.prototype = Object.create(BaseCreep.prototype);

RemoteCreep.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (!this.state) {
			this.state = "movingToSpawnedRoom";
		}

		if (this.creep.room.name === this.spawnedRoomName) {

			this.spawnedRoomAct();

		} else if (this.creep.room.name === this.remoteRoomName) {

			this.remoteRoomAct();

		} else {

			if (!this.unknownRoomAct()) {
				this.state = "movingToSpawnedRoom";
			}
		}
	}
}

RemoteCreep.prototype.spawnedRoomAct = function() {
}

RemoteCreep.prototype.remoteRoomAct = function() {
}

RemoteCreep.prototype.unknownRoomAct = function() {
	return false;
}

RemoteCreep.prototype.moveToSpawnedRoom = function() {
	this.state = "movingToSpawnedRoom";
	this.moveToExit(this.spawnedRoomName);
}

RemoteCreep.prototype.moveToRemoteRoom = function() {
	this.state = "movingToRemoteRoom";
	this.moveToExit(this.remoteRoomName);
}

RemoteCreep.prototype.arrivedAtSpawnedRoom = function() {
}

RemoteCreep.prototype.arrivedAtRemoteRoom = function() {
}


module.exports = RemoteCreep