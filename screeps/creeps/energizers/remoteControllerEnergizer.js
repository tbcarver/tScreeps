
var RemoteEnergizer = require("./remoteEnergizer");
var RemoteCreep = require("../remoteCreep");

function RemoteControllerEnergizer(creep) {

	RemoteEnergizer.call(this, creep);
}

RemoteControllerEnergizer.prototype = Object.create(RemoteEnergizer.prototype);

RemoteControllerEnergizer.prototype.act = function() {

	RemoteEnergizer.prototype.act.call(this);
}

RemoteControllerEnergizer.prototype.energize = function() {

	var transferResult = this.creep.upgradeController(this.creep.room.controller);

	if (transferResult == ERR_NOT_IN_RANGE) {

		this.creep.moveTo(this.creep.room.controller);

	} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

		this.state = "harvesting";
	}
}

RemoteControllerEnergizer.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory;

	if (RemoteCreep.hasRemoteRoom()) {

		var creepMemory = {
			type: "remoteControllerEnergizer",
			bodyPartsType: "energizer",
			maximumSpawnCapacity: 600,
		}
	}

	return creepMemory;
}

module.exports = RemoteControllerEnergizer