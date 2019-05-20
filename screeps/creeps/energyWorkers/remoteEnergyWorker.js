
var RemoteCreep = require("../remoteCreep");
var findTools = require("../../tools/findTools");

function RemoteEnergyWorker(creep) {

	RemoteCreep.call(this, creep);
}

RemoteEnergyWorker.prototype = Object.create(RemoteCreep.prototype);

RemoteEnergyWorker.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteEnergyWorker.prototype.arrivedAtRoom = function() {
}

RemoteEnergyWorker.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteEnergyWorker.prototype.roomAct = function() {
	this.moveToRemoteRoom();
}

RemoteEnergyWorker.prototype.remoteRoomAct = function() {

	if (this.state === "stepTwoAway") {
		this.creep.moveTo(spawn);
		this.state = "stepOneAway";
	} else if (this.state === "stepOneAway") {
		this.creep.moveTo(spawn);
		this.state = "working";
	}

	if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

		if (this.state !== "harvesting") {
			this.state = "harvesting";
		}

		var resource = this.creep.pos.findClosestByPath(FIND_SOURCES);

		if (resource) {

			if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(resource);
			}
		} else {

			// debug.warning(`${this.type} energy not found`);
		}
	}

	if (this.state === "working" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		if (this.state !== "working") {
			this.state = "working";
		}

		this.work();
	}
}

module.exports = RemoteEnergyWorker