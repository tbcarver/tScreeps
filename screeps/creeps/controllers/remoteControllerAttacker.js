
var RemoteCreep = require("../baseCreeps/remoteCreep");

function RemoteControllerAttacker(creep) {

	RemoteCreep.call(this, creep);
}

RemoteControllerAttacker.prototype = Object.create(RemoteCreep.prototype);

RemoteControllerAttacker.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteControllerAttacker.prototype.arrivedAtSpawnedRoom = function() {
}

RemoteControllerAttacker.prototype.arrivedAtRemoteRoom = function() {
	this.state = "claiming";
}

RemoteControllerAttacker.prototype.spawnedRoomAct = function() {
}

RemoteControllerAttacker.prototype.remoteRoomAct = function() {

	var controller = this.creep.room.controller;

	if (controller) {
		if (!controller.my) {

			var result = this.creep.attackController(controller);

			if (result === ERR_NOT_IN_RANGE) {

				this.creep.moveTo(controller);

			} else if (!(result === OK || result === ERR_TIRED)) {

				debug.warning(`${this.type} ${this.creep.name} can't attackController ${this.creep.room.name} ${result}`);
			}
		}
	} else {

		debug.warning(`${this.type} ${this.creep.name} can't find controller ${this.creep.room.name}`);
	}
}

RemoteControllerAttacker.initializeSpawnCreepMemory = function() {

	var creepMemory = {
		type: "remoteControllerAttacker",
		bodyPartsType: "claimer",
		minimumSpawnCapacity: 700,
	}

	return creepMemory;
}

module.exports = RemoteControllerAttacker