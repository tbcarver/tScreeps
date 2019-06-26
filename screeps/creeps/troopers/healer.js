
var BaseCreep = require("../baseCreeps/baseCreep");
var TrooperCreep = require("./trooperCreep");

function Healer(creep) {

	TrooperCreep.call(this, creep);
}

Healer.prototype = Object.create(TrooperCreep.prototype);

Healer.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {
		if (!this.heal()) {
			TrooperCreep.prototype.act.call(this);
		}
	}
}

Healer.prototype.attack = function() {
	this.heal();
}

Healer.prototype.heal = function() {

	var healed = false;

	var target = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
		filter: creep => creep.hits < creep.hitsMax && creep.name !== this.creep.name
	});

	if (target) {

		if (this.creep.rangedHeal(target) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		}
		healed = true;

	} else if (this.creep.hits < this.creep.hitsMax) {
		this.creep.heal(target);
		healed = true;
	}

	return healed;
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