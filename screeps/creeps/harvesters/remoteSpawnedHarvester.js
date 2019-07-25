
var RemoteCreep = require("../baseCreeps/remoteCreep");
var BaseRemoteStorageTransferer = require("../transferers/baseRemoteStorageTransferer");

class RemoteSpawnedHarvester extends RemoteCreep {

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

		BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToRemoteRoom.bind(this));
	}

	remoteRoomAct() {

		if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			this.moveToSpawnedRoom();

		} else if (this.state === "harvesting") {

			var resource = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

			if (resource) {

				if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			} else {

				// debug.warning(`${this.type} ${this.creep.name} energy not found`);
			}
		} else {
			debug.warning(`${this.type} ${this.creep.name} spawnedRoomAct called with unknown state: ${this.state}`);
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

	static initializeSpawnCreepMemory() {

		var creepMemory = {
			type: "remoteSpawnedHarvester",
			bodyPartsType: "moveCarryWork",
			maximumSpawnCapacity: 850,
		}

		return creepMemory;
	}
}


module.exports = RemoteSpawnedHarvester