
var RemoteCreep = require("../remoteCreep");
var findTools = require("../../tools/findTools");

function RemoteEnergizer(creep) {

	RemoteCreep.call(this, creep);
}

RemoteEnergizer.prototype = Object.create(RemoteCreep.prototype);

RemoteEnergizer.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteEnergizer.prototype.arrivedAtRoom = function() {
}

RemoteEnergizer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteEnergizer.prototype.roomAct = function() {
	this.moveToRemoteRoom();
}

RemoteEnergizer.prototype.remoteRoomAct = function() {
	
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

	if (this.state === "energizing" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		if (this.state !== "energizing") {
			this.state = "energizing";
		}

		this.energize();
	}
}

module.exports = RemoteEnergizer