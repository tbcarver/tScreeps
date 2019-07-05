
var { rules } = require("../../rules/rules");
var TrooperCreep = require("./trooperCreep");

function RangedAttacker(creep) {

	TrooperCreep.call(this, creep);
}

RangedAttacker.prototype = Object.create(TrooperCreep.prototype);

RangedAttacker.prototype.act = function() {
	TrooperCreep.prototype.act.call(this);
}

RangedAttacker.prototype.attack = function() {

	var enemies = this.creep.room.find(FIND_HOSTILE_CREEPS);

	if (enemies.length > 0) {

		enemies = _.sortBy(enemies, ['hits']);
		var enemy = enemies[0];

		if (enemy.hits === enemy.hitsMax) {
			enemy = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		}

		if (enemy) {

			if (this.creep.rangedAttack(enemy) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(enemy);
			}
		}
	}
}

RangedAttacker.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, currentSpawnedCount);

	if (creepMemory) {
			
		creepMemory.type = "rangedAttacker";
		creepMemory.bodyPartsType = "rangedAttacker";
		creepMemory.maximumSpawnCapacity = rules.maximumRangedAttackerSpawnCapacity || 800;
	}

	return creepMemory;
}


module.exports = RangedAttacker