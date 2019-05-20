
var RemoteCreep = require("../remoteCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");

function RemoteEnergyWorker(creep) {

	RemoteCreep.call(this, creep);
}

RemoteEnergyWorker.prototype = Object.create(RemoteCreep.prototype);

RemoteEnergyWorker.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteEnergyWorker.prototype.arrivedAtRoom = function() {
	this.state = "harvesting";
}

RemoteEnergyWorker.prototype.arrivedAtRemoteRoom = function() {
	this.state = "working";
}

RemoteEnergyWorker.prototype.roomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToRemoteRoom();

	} else if (this.state === "harvesting"){

		var resource = findTools.findClosestEnergy(this.creep.pos);

		if (resource) {

			if (resource.structureType) {

				if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}

			} else {

				if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			}
		} else {

			// debug.warning(`${this.type} energy not found`);
		}
	} else {
		debug.warning(`${this.type} roomAct called with unknown state: ${this.state}`);
	}
}

RemoteEnergyWorker.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		this.moveToRoom();

	} else if (this.state === "working"){

		this.work();

	} else {
		debug.warning(`${this.type} roomAct called with unknown state: ${this.state}`);
	}
}

module.exports = RemoteEnergyWorker