
var Energizer = require("./energizer");

function ControllerEnergizer(creep) {

	Energizer.call(this, creep);
}

ControllerEnergizer.prototype = Object.create(Energizer.prototype);

ControllerEnergizer.prototype.act = function() {

	Energizer.prototype.act.call(this);
}

ControllerEnergizer.prototype.energize = function() {

	var transferResult = this.creep.transfer(global.controller, RESOURCE_ENERGY);

	if (transferResult == ERR_NOT_IN_RANGE) {

		this.creep.moveTo(global.controller);

	} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

		this.state = "harvesting";
	}
}

ControllerEnergizer.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory = {
		type: "controllerEnergizer",
		bodyPartsType: "energizer"
	}

	return creepMemory;
}

module.exports = ControllerEnergizer