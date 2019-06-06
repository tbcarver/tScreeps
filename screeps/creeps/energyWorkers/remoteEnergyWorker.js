
var RemoteCreep = require("../remoteCreep");
var findTools = require("../../tools/findTools");

function RemoteEnergyWorker(creep) {

	RemoteCreep.call(this, creep);
}

RemoteEnergyWorker.prototype = Object.create(RemoteCreep.prototype);

RemoteEnergyWorker.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteEnergyWorker.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "harvesting";
}

RemoteEnergyWorker.prototype.arrivedAtRemoteRoom = function() {
	this.state = "working";
}

RemoteEnergyWorker.prototype.spawnedRoomAct = function() {

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

			// debug.warning(`${this.type} energy not found`);
		}
	}
}

RemoteEnergyWorker.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		this.moveToSpawnedRoom();

	} else if (this.state === "working") {

		this.work();
	}
}


module.exports = RemoteEnergyWorker