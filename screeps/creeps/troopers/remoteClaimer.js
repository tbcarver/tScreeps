
var RemoteCreep = require("../remoteCreep");

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
	
	debug.temp(this.creep.name, "claiming")
}

RemoteClaimer.prototype.spawnedRoomAct = function() {
}

RemoteClaimer.prototype.remoteRoomAct = function() {

	var controller = this.creep.room.controller;

	if (controller) {

		var result = this.creep.claimController(controller);

		if (result === ERR_NOT_IN_RANGE) {

			debug.temp(this.creep.name, "remoteRoomAct", controller.pos)
			this.creep.moveTo(controller);

		} else {

			debug.warning(`${this.type} can't can't claim ${result}`);
		}
	} else {

		debug.warning(`${this.type} can't find remote controller`);
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