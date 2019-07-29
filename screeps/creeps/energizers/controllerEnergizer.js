
var EnergyCreep = require("../baseCreeps/energyCreep");

class ControllerEnergizer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canBuild = false;
		if (this.creepsSpawnRule && this.creepsSpawnRule.canControllerEnergizersBuild) {
			this.canBuild = true;
		}
	}

	act() {
		return super.act();
	}

	energyAct() {

		var acted = false;
		var target;

		if (this.canBuild) {

			target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

			if (target) {
				if (this.isInTravelDistance(target)) {
					this.travelNearTo(target, true);
				} else {
					if (this.creep.build(target) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(target);
					}
					acted = true;
				}
			}
		}

		if (!acted) {

			target = this.creep.room.controller;

			if (target) {

				if (this.isInTravelDistance(target)) {
					this.travelNearTo(target, true);
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
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory = {
			type: "controllerEnergizer",
			bodyPartsType: "moveCarryWork",
			maximumSpawnCapacity: 850,
		}

		creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);

		return creepMemory;
	}
}


module.exports = ControllerEnergizer