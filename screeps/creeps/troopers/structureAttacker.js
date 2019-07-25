
var { rules } = require("../../rules/rules");
var TrooperCreep = require("./trooperCreep");

class StructureAttacker extends TrooperCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		return super.act();
	}

	attack() {

		var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_TOWER }
		});

		if (!target) {
			target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: { structureType: STRUCTURE_SPAWN }
			});
		}

		if (target) {

			if (this.creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(target);
			}
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

		var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {
			creepMemory.type = "structureAttacker";
			creepMemory.bodyPartsType =  "rangedAttacker";
			creepMemory.maximumSpawnCapacity = rules.maximumRangedAttackerSpawnCapacity || 800;
		}

		return creepMemory;
	}
}


module.exports = StructureAttacker