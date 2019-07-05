
var { rules } = require("../../rules/rules");
var TrooperCreep = require("./trooperCreep");

function Attacker(creep) {

	TrooperCreep.call(this, creep);
}

Attacker.prototype = Object.create(TrooperCreep.prototype);

Attacker.prototype.act = function() {
	TrooperCreep.prototype.act.call(this);
}

Attacker.prototype.attack = function() {

	var enemies = this.creep.room.find(FIND_HOSTILE_CREEPS);

	if (enemies.length > 0) {

		enemies = _.sortBy(enemies, ['hits']);
		var enemy = enemies[0];

		if (enemy.hits === enemy.hitsMax) {
			enemy = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		}

		if (enemy) {

			if (this.creep.attack(enemy) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(enemy);
			}
		}
	}
}

Attacker.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, currentSpawnedCount);

	if (creepMemory) {

		creepMemory.type = "attacker";
		creepMemory.bodyPartsType = "attacker";
		creepMemory.maximumSpawnCapacity = rules.maximumAttackerSpawnCapacity || 800;
	}

	return creepMemory;
}


module.exports = Attacker