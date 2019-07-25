
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

			var resource = findTools.findClosestEnergy(this.creep.pos);

			if (resource) {

				if (resource.structureType) {

					if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}
				} else {

					if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);

					} else if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {
						// Step away from an energy source to not block it
						this.moveToRemoteRoom();
						this.memory.takeStepsIntoRoom = 2;
					}
				}
			} else {

				// debug.warning(`${this.type} ${this.creep.name} energy not found`);
			}
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
}


module.exports = RemoteEnergyWorker