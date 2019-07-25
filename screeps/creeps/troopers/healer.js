
var { rules } = require("../../rules/rules");
var BaseCreep = require("../baseCreeps/baseCreep");
var TrooperCreep = require("./trooperCreep");

class Healer extends TrooperCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {

		var acted = super.act();

		if (!super.act()) {
			if (!this.heal()) {
				TrooperCreep.prototype.act.call(this);
			}

			acted = true;
		}

		return acted;
	}

	attack() {
		this.heal();
	}

	heal() {

		var healed = false;

		var creeps = this.creep.room.find(FIND_MY_CREEPS, {
			filter: creep => creep.hits < creep.hitsMax && creep.name !== this.creep.name &&
				creep.memory.isMobTrooper
		});

		if (creeps.length > 0) {

			_.sortBy(creeps, ["hits"]);
			var creep = creeps[0];

		} else {

			var creep = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
				filter: creep => creep.hits < creep.hitsMax && creep.name !== this.creep.name
			});
		}

		if (creep) {

			if (this.creep.rangedHeal(creep) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(creep);
			}
			healed = true;

		} else if (this.creep.hits < this.creep.hitsMax) {
			this.creep.heal(creep);
			healed = true;
		}

		return healed;
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {


		var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {
			creepMemory.type = "healer";
			creepMemory.bodyPartsType = "healer";
			creepMemory.maximumSpawnCapacity = rules.maximumHealerSpawnCapacity || 800;
		}

		return creepMemory;
	}
}


module.exports = Healer