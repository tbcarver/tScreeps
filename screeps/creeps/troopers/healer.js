
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
		filter: creep => creep.hits < creep.hitsMax && creep.name !== this.creep.name
	});

	if (target) {

		if (this.creep.rangedHeal(target) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		}
	} else if (this.creep.hits < this.creep.hitsMax) {
		this.creep.heal(target);
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