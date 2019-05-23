
var Energizer = require("./energizer");

function ControllerEnergizer(creep) {

	Energizer.call(this, creep);
}

ControllerEnergizer.prototype = Object.create(Energizer.prototype);

ControllerEnergizer.prototype.act = function() {

	Energizer.prototype.act.call(this);
}

ControllerEnergizer.prototype.energize = function() {

	var transferResult = this.creep.upgradeController(this.creep.room.controller);

	if (transferResult == ERR_NOT_IN_RANGE) {

		this.creep.moveTo(this.creep.room.controller);

	} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

		this.state = "harvesting";
	}
}

ControllerEnergizer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "controllerEnergizer",
		bodyPartsType: "energizer",
		maximumSpawnCapacity: 600,
		canHarvest: creepsSpawnRule.canEnergizersHarvest,
	}

	return creepMemory;
}

module.exports = ControllerEnergizer