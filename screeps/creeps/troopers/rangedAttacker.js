
var rules = require("../../rules/rules");
var TrooperCreep = require("./trooperCreep");

function RangedAttacker(creep) {

	TrooperCreep.call(this, creep);
}

RangedAttacker.prototype = Object.create(TrooperCreep.prototype);

RangedAttacker.prototype.act = function() {
	TrooperCreep.prototype.act.call(this);
}

RangedAttacker.prototype.attack = function() {

	var target = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

	if (target) {

		if (this.creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
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