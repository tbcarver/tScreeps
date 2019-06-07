
var EnergyCreep = require("../baseCreeps/energyCreep");

function ControllerEnergizer(creep) {

	EnergyCreep.call(this, creep);
}

ControllerEnergizer.prototype = Object.create(EnergyCreep.prototype);

ControllerEnergizer.prototype.act = function() {

	EnergyCreep.prototype.act.call(this);
}

ControllerEnergizer.prototype.energyAct = function() {
	
	var acted = false;

	if (this.creepsSpawnRule.canControllerEnergizersBuild) {

		const target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

		if (target) {

			if (this.creep.build(target) == ERR_NOT_IN_RANGE) {

				this.creep.moveTo(target);
			}

			acted = true;
		}
	}

	if (!acted) {

		var transferResult = this.creep.upgradeController(this.creep.room.controller);

		if (transferResult == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(this.creep.room.controller);

		} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

			this.state = "harvesting";
		}
	}
}

ControllerEnergizer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "controllerEnergizer",
		bodyPartsType: "energizer",
		maximumSpawnCapacity: 600,
	}

	creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);

	return creepMemory;
}

module.exports = ControllerEnergizer