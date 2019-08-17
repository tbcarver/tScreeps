
var roomTools = require("../../tools/roomTools");
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");
var DropTransferer = require("./dropTransferer");

class RemoteSpawnedDropTransferer extends BaseRemoteStorageTransferer {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {

		if (this.state === "movingToSpawnedRoom") {
			var dropFlag = Game.flags[`drop-${this.roomName}`];
			if (dropFlag) {
				this.state = "transferring";
			}
		}

		if (this.state === "harvesting" && this.roomName !== this.remoteRoomName) {
			this.moveToRemoteRoom();
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

		if (this.creep.carry.energy === this.creep.carryCapacity) {

			this.moveToSpawnedRoom();

		} else if (this.state === "harvesting") {

			if (!this.isDying) {
				DropTransferer.prototype.harvest.call(this, this.moveToSpawnedRoom.bind(this));
			}
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
			}

			creepMemory = Object.assign(creepMemory, spawnOrderMaxSpawnedCount.creepMemory);

		} else if (room.find) {

			var resources = roomTools.GetSourcesWritableDroppedResources(room.name);

			if (resources.length > 0) {

				creepMemory = {
					type: "dropTransferer",
				}
			}
		}

		if (creepMemory) {
			creepMemory.bodyPartsType = "moveCarry";
			creepMemory.maximumSpawnCapacity = 750;
			creepMemory.minimumSpawnCapacity = 600;
		}

		return creepMemory;
	}
}


module.exports = RemoteSpawnedDropTransferer