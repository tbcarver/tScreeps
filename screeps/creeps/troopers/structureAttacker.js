
var enemyTools = require("../../tools/enemyTools");
var { rules } = require("../../rules/rules");
var TrooperCreep = require("./trooperCreep");

class StructureAttacker extends TrooperCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
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

			if (this.creep.attack(target) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(target);
			}
		}
	}

	isDamaged() {
		return !(this.creep.body.find(bodyPart => bodyPart.type === ATTACK && bodyPart.hits > 0));
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

		var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {
			creepMemory.type = "structureAttacker";
			creepMemory.bodyPartsType =  "attacker";
			creepMemory.isAttackTrooper = true;
			creepMemory.maximumSpawnCapacity = rules.maximumAttackerSpawnCapacity || 800;
		}

		return creepMemory;
	}
}


module.exports = StructureAttacker