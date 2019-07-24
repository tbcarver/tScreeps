
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

class RemoteStorageTransferer extends BaseRemoteStorageTransferer {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		super.act();
	}

	arrivedAtSpawnedRoom() {
		this.state = "harvesting";
	}

	arrivedAtRemoteRoom() {
		this.state = "transferring";
	}

	spawnedRoomAct() {

		super.harvest(this.moveToRemoteRoom.bind(this));
	}

	remoteRoomAct() {

		super.transfer(this.moveToSpawnedRoom.bind(this));
	}

	static initializeSpawnCreepMemory(room) {

		return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteStorageTransferer", room);
	}
}


module.exports = RemoteStorageTransferer