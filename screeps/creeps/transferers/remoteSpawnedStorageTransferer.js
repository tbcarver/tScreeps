
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");

class RemoteSpawnedStorageTransferer extends BaseRemoteStorageTransferer {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	arrivedAtSpawnedRoom() {
		this.state = "transferring";
	}

	arrivedAtRemoteRoom() {
		this.state = "harvesting";
	}

	spawnedRoomAct() {

		BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToRemoteRoom.bind(this));
	}

	remoteRoomAct() {

		if (!this.isDying) {
			BaseRemoteStorageTransferer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
		}
	}

	static initializeSpawnCreepMemory(room) {

		return BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteSpawnedStorageTransferer", room);
	}
}


module.exports = RemoteSpawnedStorageTransferer