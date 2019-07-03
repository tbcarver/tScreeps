
var RemoteCreep = require("../baseCreeps/remoteCreep");

function RemoteClaimer(creep) {

	RemoteCreep.call(this, creep);
}

RemoteClaimer.prototype = Object.create(RemoteCreep.prototype);

RemoteClaimer.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteClaimer.prototype.arrivedAtSpawnedRoom = function() {
}

RemoteClaimer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "claiming";
}

RemoteClaimer.prototype.spawnedRoomAct = function() {
}

RemoteClaimer.prototype.remoteRoomAct = function() {

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

RemoteClaimer.initializeSpawnCreepMemory = function() {

	var creepMemory = {
		type: "remoteClaimer",
		bodyPartsType: "claimer",
		minimumSpawnCapacity: 700,
	}

	return creepMemory;
}

module.exports = RemoteClaimer