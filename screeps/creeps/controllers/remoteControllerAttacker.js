
var RemoteCreep = require("../baseCreeps/remoteCreep");

class RemoteControllerAttacker extends RemoteCreep {

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

				var result = this.creep.attackController(controller);

				if (result === ERR_NOT_IN_RANGE) {

					this.creep.moveTo(controller);

				} else if (!(result === OK || result === ERR_TIRED)) {

					debug.warning(`${this.type} ${this.creep.name} can't attackController ${this.creep.room.name} ${result}`);
				}
			}
		} else {

			debug.warning(`${this.type} ${this.creep.name} can't find controller ${this.creep.room.name}`);
		}
	}

	static initializeSpawnCreepMemory() {

		var creepMemory = {
			type: "remoteControllerAttacker",
			bodyPartsType: "claimer",
			minimumSpawnCapacity: 700,
		}

		return creepMemory;
	}
}


module.exports = RemoteControllerAttacker