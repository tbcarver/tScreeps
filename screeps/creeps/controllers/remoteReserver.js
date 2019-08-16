
var RemoteCreep = require("../baseCreeps/remoteCreep");

class RemoteReserver extends RemoteCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	arrivedAtSpawnedRoom() {
	}

	arrivedAtRemoteRoom() {
		this.state = "reserving";
	}

	spawnedRoomAct() {
	}

	remoteRoomAct() {

		var controller = this.creep.room.controller;

		if (controller) {

			if (this.isInTravelDistance(controller)) {
				this.travelNearTo(controller);
			} else {

				var result = this.creep.reserveController(controller);
				if (result === OK) {
	
					// debug.highlight(`${this.type} reserved controller ${this.roomName}`);
	
				} else if (result === ERR_NOT_IN_RANGE) {
	
					this.creep.moveTo(controller);
	
				} else {	
					debug.warning(`${this.type} ${this.creep.name} can't reserve ${this.roomName} ${result}`);
				}
			}
		} else {

			debug.warning(`${this.type} ${this.creep.name} can't find remote controller ${this.roomName}`);
		}
	}

	static initializeSpawnCreepMemory() {

		var creepMemory = {
			type: "remoteReserver",
			bodyPartsType: "claimer",
			minimumSpawnCapacity: 700,
		}

		return creepMemory;
	}
}

module.exports = RemoteReserver