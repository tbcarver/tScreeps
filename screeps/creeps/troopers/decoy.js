
var BaseCreep = require("../baseCreeps/baseCreep");
var TrooperCreep = require("./trooperCreep");

class Decoy extends TrooperCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {

		if (!super.act()) {
			if (!this.heal()) {
				TrooperCreep.prototype.act.call(this);
			}
		}
	}

	attack() {
		this.heal();
	}

	heal() {

		var healed = false;

		if (this.creep.hits < this.creep.hitsMax) {

			this.creep.heal(target);
			healed = true;

		} else {

			var target = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
				filter: creep => creep.hits < creep.hitsMax
			});

			if (target) {

				if (this.creep.rangedHeal(target) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(target);
				}

				healed = true;
			}
		}

		return healed;
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

		var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {

			creepMemory.type = "decoy";
			creepMemory.bodyPartsType = "healerTough";
			creepMemory.minimumSpawnCapacity = 450;
			creepMemory.maximumSpawnCapacity = 450;
		}

		return creepMemory;
	}
}


module.exports = Decoy