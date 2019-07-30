
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

	harvest() {
		delete this.creep.memory.upgradeControllerRange;
		super.harvest();
	}

	harvestCompleteMove() {
		this.energyAct();
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

				if (this.avoidCreeps) {
					this.creep.memory.upgradeControllerRange = 3;
				}

				var range = this.creep.memory.upgradeControllerRange || 2;

				if (!this.creep.pos.inRangeTo(target, range)) {
					this.travelTo(target, range, true);
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