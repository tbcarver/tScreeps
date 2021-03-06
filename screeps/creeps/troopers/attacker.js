
var enemyTools = require("../../tools/enemyTools");
var { rules } = require("../../rules/rules");
var TrooperCreep = require("./trooperCreep");

class Attacker extends TrooperCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	attack() {

		var enemies = this.creep.room.find(FIND_HOSTILE_CREEPS);

		if (enemies.length > 0) {

			enemies = _.sortBy(enemies, ['hits']);
			var enemy = enemies[0];

			if (enemy.hits === enemy.hitsMax) {
				enemy = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			}

			if (enemy) {
				this.creep.moveTo(enemy);
				this.creep.attack(enemy);
			}
		}
	}

	isDamaged() {
		return !(this.creep.body.find(bodyPart => bodyPart.type === ATTACK && bodyPart.hits > 0));
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

		var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {
			creepMemory.type = "attacker";
			creepMemory.bodyPartsType = "attacker";
			creepMemory.isAttackTrooper = true;
			creepMemory.maximumSpawnCapacity = rules.maximumAttackerSpawnCapacity || 800;
		}

		return creepMemory;
	}
}


module.exports = Attacker