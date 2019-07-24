
var enemyTools = require("../../tools/enemyTools");

var BaseCreep = require("./baseCreep");

class RemoteCreep extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.suppressReturnToRooms = true;
	}

	act() {
		if (!super.act()) {

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

	spawnedRoomAct() {
	}

	remoteRoomAct() {
	}

	unknownRoomAct() {
		return false;
	}

	moveToSpawnedRoom() {
		this.state = "movingToSpawnedRoom";
		this.moveToExit(this.spawnedRoomName);
	}

	moveToRemoteRoom() {
		this.state = "movingToRemoteRoom";
		this.moveToExit(this.remoteRoomName);
	}

	arrivedAtSpawnedRoom() {
	}

	arrivedAtRemoteRoom() {
	}
}


module.exports = RemoteCreep