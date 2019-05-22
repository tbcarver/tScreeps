
var CustomCreep = require("./customCreep");

function RemoteCreep(creep) {

	CustomCreep.call(this, creep);
}

RemoteCreep.prototype = Object.create(CustomCreep.prototype);

RemoteCreep.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		if (!this.state) {
			this.state = "movingToRemoteRoom";
		}

		if (this.state === "movingToRoom") {

			this.creep.moveTo(spawn);

			if (this.creep.room.name === room.name) {
				this.arrivedAtRoom();
			}
		} else if (this.state === "movingToRemoteRoom") {

			var exitDirection = room.findExitTo(this.remoteRoomName);

			if (exitDirection && exitDirection >= OK) {

				var exit = this.creep.pos.findClosestByPath(exitDirection);

				if (exit) {

					this.creep.moveTo(exit);

					if (this.creep.room.name === this.remoteRoomName) {
						this.arrivedAtRemoteRoom();
					}
				} else {
					debug.warning(`${this.type} can't find a path to the exit to ${this.remoteRoomName}`);
				}
			} else {
				debug.warning(`${this.type} can't find an exit direction to ${this.remoteRoomName}`);
			}

		} else if (this.creep.room.name === room.name) {

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


module.exports = RemoteCreep