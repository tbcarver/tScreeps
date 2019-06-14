
var TrooperCreep = require("./trooperCreep");

function Healer(creep) {

	TrooperCreep.call(this, creep);
}

Healer.prototype = Object.create(TrooperCreep.prototype);

Healer.prototype.act = function() {
	TrooperCreep.prototype.act.call(this);
}

Healer.prototype.attack = function() {

	target = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
		filter: creep => creep.hits < creep.hitsMax
	});

	if (target) {

		if (this.creep.heal(target) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		}
	}
}

Healer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule,
		rules.maximumHealerSpawnCapacity);

	if (creepMemory) {
			
		creepMemory.type = "healer";
		creepMemory.bodyPartsType = "healer";
	}

	return creepMemory;
}


module.exports = Healer