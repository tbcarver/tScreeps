
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

		if (this.state === "movingToRoom") {

			if (this.creep.room.name === this.spawnedRoomName) {

				this.arrivedAtRoom();
				this.roomAct();

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

			this.roomAct();

		} else if (this.creep.room.name === this.remoteRoomName) {

			this.remoteRoomAct();

		} else {
			debug.warning(`${this.type} in unknown room: ${this.creep.room.name}`);
		}
	}
}

RemoteCreep.prototype.roomAct = function() {
}

RemoteCreep.prototype.remoteRoomAct = function() {
}

RemoteCreep.prototype.moveToRoom = function() {
	this.state = "movingToRoom";
}

RemoteCreep.prototype.moveToRemoteRoom = function() {
	this.state = "movingToRemoteRoom";
}

RemoteCreep.prototype.arrivedAtRoom = function() {
}

RemoteCreep.prototype.arrivedAtRemoteRoom = function() {
}

RemoteCreep.prototype.moveToExit = function(exitRoomName) {

	var exitDirection = this.creep.room.findExitTo(exitRoomName);

	if (exitDirection && exitDirection >= OK) {

		var exit = this.creep.pos.findClosestByPath(exitDirection);

		if (exit) {

			this.creep.moveTo(exit);

		} else {
			debug.warning(`${this.type} can't find a path to the exit to ${exitRoomName}`);
		}
	} else {
		debug.warning(`${this.type} can't find an exit direction to ${exitRoomName}`);
	}
}


module.exports = RemoteCreep