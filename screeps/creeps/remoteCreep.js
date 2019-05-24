
var CustomCreep = require("./customCreep");

function RemoteCreep(creep) {

	CustomCreep.call(this, creep);

	this.isRemoteCreep = true;
}

RemoteCreep.prototype = Object.create(CustomCreep.prototype);

RemoteCreep.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		if (!this.state) {
			this.state = "movingToRemoteRoom";
		}

		if (this.state === "movingToSpawnedRoom") {

			if (this.creep.room.name === this.spawnedRoomName) {

				this.arrivedAtSpawnedRoom();
				this.spawnedRoomAct();

			} else {

				this.moveToExit(this.spawnedRoomName);
			}
		} else if (this.state === "movingToRemoteRoom") {

			if (this.creep.room.name === this.remoteRoomName) {

				this.arrivedAtRemoteRoom();
				this.remoteRoomAct();

			} else {

				this.moveToExit(this.remoteRoomName);
			}
		} else if (this.creep.room.name === this.spawnedRoomName) {

			this.spawnedRoomAct();

		} else if (this.creep.room.name === this.remoteRoomName) {

			this.remoteRoomAct();

		} else {
			debug.warning(`${this.type} in unknown room: ${this.creep.room.name}`);
		}
	}
}

RemoteCreep.prototype.spawnedRoomAct = function() {
}

RemoteCreep.prototype.remoteRoomAct = function() {
}

RemoteCreep.prototype.moveToSpawnedRoom = function() {
	this.state = "movingToSpawnedRoom";
}

RemoteCreep.prototype.moveToRemoteRoom = function() {
	this.state = "movingToRemoteRoom";
}

RemoteCreep.prototype.arrivedAtSpawnedRoom = function() {
}

RemoteCreep.prototype.arrivedAtRemoteRoom = function() {
}


module.exports = RemoteCreep