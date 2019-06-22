
var RemoteCreep = require("../baseCreeps/remoteCreep");

function RemoteReserver(creep) {

	RemoteCreep.call(this, creep);
}

RemoteReserver.prototype = Object.create(RemoteCreep.prototype);

RemoteReserver.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteReserver.prototype.arrivedAtSpawnedRoom = function() {
}

RemoteReserver.prototype.arrivedAtRemoteRoom = function() {
	this.state = "reserving";
}

RemoteReserver.prototype.spawnedRoomAct = function() {
}

RemoteReserver.prototype.remoteRoomAct = function() {

	var controller = this.creep.room.controller;

	if (controller) {

		var result = this.creep.reserveController(controller);

		if (result === OK) {

			// debug.highlight(`${this.type} reserved controller ${this.creep.room.name}`);

		} else if (result === ERR_NOT_IN_RANGE) {

			this.creep.moveTo(controller);

		} else {

			debug.warning(`${this.type} ${this.creep.name} can't reserve ${this.creep.room.name} ${result}`);
		}
	} else {

		debug.warning(`${this.type} ${this.creep.name} can't find remote controller`);
	}
}

RemoteReserver.initializeSpawnCreepMemory = function() {

	var creepMemory = {
		type: "remoteReserver",
		bodyPartsType: "claimer",
		minimumSpawnCapacity: 700,
	}

	return creepMemory;
}

module.exports = RemoteReserver