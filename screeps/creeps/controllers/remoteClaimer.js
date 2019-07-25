
var RemoteCreep = require("../baseCreeps/remoteCreep");

class RemoteClaimer extends RemoteCreep {

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
		this.state = "claiming";
	}

	spawnedRoomAct() {
	}

	remoteRoomAct() {

		var controller = this.creep.room.controller;

		if (controller) {
			if (!controller.my) {

				var result = this.creep.claimController(controller);

				if (result === OK) {

					debug.highlight(`${this.type} claimed controller ${this.creep.room.name}`);

				} else if (result === ERR_NOT_IN_RANGE) {

					this.creep.moveTo(controller);

				} else {

					debug.warning(`${this.type} ${this.creep.name} can't claim ${this.creep.room.name} ${result}`);
				}
			}
		} else {

			debug.warning(`${this.type} ${this.creep.name} can't find remote controller ${this.creep.room.name}`);
		}
	}

	static initializeSpawnCreepMemory() {

		var creepMemory = {
			type: "remoteClaimer",
			bodyPartsType: "claimer",
			minimumSpawnCapacity: 700,
		}

		return creepMemory;
	}
}


module.exports = RemoteClaimer