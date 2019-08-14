
var RemoteCreep = require("../baseCreeps/remoteCreep");

class RemoteSitter extends RemoteCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		return super.act();
	}

	arrivedAtSpawnedRoom() {
	}

	arrivedAtRemoteRoom() {
		this.state = "sitting";
	}

	spawnedRoomAct() {
	}

	remoteRoomAct() {

		var controller = this.creep.room.controller;

		if (controller) {

			this.creep.moveTo(controller);

		} else {

			debug.warning(`${this.type} ${this.creep.name} can't find remote controller ${this.roomName}`);
		}
	}

	static initializeSpawnCreepMemory() {

		var creepMemory = {
			type: "remoteSitter",
			bodyPartsType: "move",
		}

		return creepMemory;
	}
}

module.exports = RemoteSitter