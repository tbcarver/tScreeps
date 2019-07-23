
var EnergyCreep = require("../baseCreeps/energyCreep");

function ControllerEnergizer(creep) {

	EnergyCreep.call(this, creep);

	this.canBuild = false;
	if (this.creepsSpawnRule && this.creepsSpawnRule.canControllerEnergizersBuild) {
		this.canBuild = true;
	}
}

ControllerEnergizer.prototype = Object.create(EnergyCreep.prototype);

ControllerEnergizer.prototype.act = function() {

	EnergyCreep.prototype.act.call(this);
}

ControllerEnergizer.prototype.energyAct = function(moveToOnly) {

	var acted = false;

	if (this.canBuild) {

		const target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

		if (target) {

			if (moveToOnly) {
				this.creep.moveTo(target);
			} else {
				if (this.creep.build(target) == ERR_NOT_IN_RANGE) {

					this.creep.moveTo(target);
				}

				acted = true;
			}

		}
	}

	if (!acted) {

		if (moveOnly) {
			this.creep.moveTo(this.creep.room.controller);
		} else {

			var transferResult = this.creep.upgradeController(this.creep.room.controller);

			if (transferResult == ERR_NOT_IN_RANGE) {

				this.creep.moveTo(this.creep.room.controller);

			} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

				this.state = "harvesting";
			}
		}
	}
}

ControllerEnergizer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "controllerEnergizer",
		bodyPartsType: "moveCarryWork",
		maximumSpawnCapacity: 850,
	}

	creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);

	return creepMemory;
}

module.exports = ControllerEnergizer