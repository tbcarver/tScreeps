
var TrooperCreep = require("./trooperCreep");

function Attacker(creep) {

	TrooperCreep.call(this, creep);
}

Attacker.prototype = Object.create(TrooperCreep.prototype);

Attacker.prototype.act = function() {
	TrooperCreep.prototype.act.call(this);
}

Attacker.prototype.attack = function() {

	target = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

	if (target) {

		if (this.creep.heal(target) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		}
	}
}

Attacker.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule,
		rules.maximumAttackerSpawnCapacity);

	if (creepMemory) {
			
		creepMemory.type = "attacker";
		creepMemory.bodyPartsType = "attacker";
	}

	return creepMemory;
}


module.exports = Attacker