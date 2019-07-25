
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");
var DropTransferer = require("./dropTransferer");

class RemoteSpawnedDropTransferer extends BaseRemoteStorageTransferer {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {

		if (this.state === "movingToSpawnedRoom") {
			var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
			if (dropFlag) {
				this.state = "transferring";
			}
		}

		return super.act();
	}

	arrivedAtSpawnedRoom() {
		this.state = "transferring";
	}

	arrivedAtRemoteRoom() {
		this.state = "harvesting";
	}

	spawnedRoomAct() {

		super.transfer(this.moveToRemoteRoom.bind(this));
	}

	remoteRoomAct() {

		if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			this.moveToSpawnedRoom();

		} else if (this.state === "harvesting") {

			DropTransferer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
		}
	}

	unknownRoomAct() {

		var acted = false;

		if (this.state === "transferring") {

			this.spawnedRoomAct();
			acted = true;
		}

		return acted;
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount) {

		var creepMemory;

		if (spawnOrderMaxSpawnedCount.creepMemory) {

			creepMemory = {
				type: "remoteSpawnedDropTransferer",
				subType: spawnOrderMaxSpawnedCount.creepSubType,
				bodyPartsType: "moveCarry",
				maximumSpawnCapacity: 750,
				minimumSpawnCapacity: 600,
			}

			creepMemory = Object.assign(creepMemory, spawnOrderMaxSpawnedCount.creepMemory);

		} else {

			creepMemory = BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteSpawnedDropTransferer", room);
		}

		return creepMemory;
	}
}


module.exports = RemoteSpawnedDropTransferer