
var BaseCreep = require("./baseCreep");

function RemoteCreep(creep) {

	BaseCreep.call(this, creep);

	this.isRemoteCreep = true;
}

RemoteCreep.prototype = Object.create(BaseCreep.prototype);

RemoteCreep.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (!this.state) {
			this.state = "movingToRemoteRoom";
		}

		if (this.state === "movingToSpawnedRoom") {

			if (this.creep.room.name === this.spawnedRoomName) {

				this.arrivedAtSpawnedRoom();
				// NOTE: Creep must step off the exit edge of the room immediately
				//  or will be sent back to the other room
				this.moveIntoRoom();

			} else {

				this.moveToExit(this.spawnedRoomName);
			}
		} else if (this.state === "movingToRemoteRoom") {

			if (this.creep.room.name === this.remoteRoomName) {

				// NOTE: Creep must step off the exit edge of the room immediately
				//  or will be sent back to the other room
				this.moveIntoRoom();
				this.arrivedAtRemoteRoom();
				this.memory.takeStepsIntoRoom = 2;

			} else {

				if (this.isTrooper || !Game.rooms[this.remoteRoomName] || Game.rooms[this.remoteRoomName].find(FIND_HOSTILE_CREEPS).length === 0) {

					this.moveToExit(this.remoteRoomName);
				}
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