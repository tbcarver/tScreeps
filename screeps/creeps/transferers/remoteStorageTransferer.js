
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

class RemoteStorageTransferer extends BaseRemoteStorageTransferer {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	arrivedAtSpawnedRoom() {
		this.state = "harvesting";
	}

	arrivedAtRemoteRoom() {
		this.state = "transferring";
	}

	spawnedRoomAct() {

		if (!this.isDying) {
			this.harvest(this.moveToRemoteRoom.bind(this));
		}
	}

	remoteRoomAct() {

		this.transfer(this.moveToSpawnedRoom.bind(this));
	}

	static initializeSpawnCreepMemory(room) {

		return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteStorageTransferer", room);
	}
}


module.exports = RemoteStorageTransferer