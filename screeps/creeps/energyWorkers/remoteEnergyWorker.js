
var EnergyCreep = require("../baseCreeps/energyCreep");
var RemoteCreep = require("../baseCreeps/remoteCreep");
var findTools = require("../../tools/findTools");

class RemoteEnergyWorker extends RemoteCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		return super.act();
	}

	arrivedAtSpawnedRoom() {
		this.state = "harvesting";
	}

	arrivedAtRemoteRoom() {
		this.state = "working";
	}

	spawnedRoomAct() {

		if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			this.moveToRemoteRoom();

		} else if (this.state === "harvesting") {

			EnergyCreep.prototype.harvest();
		}
	}

	remoteRoomAct() {

		if (this.creep.carry[RESOURCE_ENERGY] === 0) {

			this.moveToSpawnedRoom();

		} else if (this.state === "working") {

			this.work();
		}
	}

	work(){
	}

	harvestCompleteMove() {
		this.moveToRemoteRoom();
		this.memory.takeStepsIntoRoom = 1;
	}
}


module.exports = RemoteEnergyWorker