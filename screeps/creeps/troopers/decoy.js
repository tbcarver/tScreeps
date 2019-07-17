
var BaseCreep = require("../baseCreeps/baseCreep");
var TrooperCreep = require("./trooperCreep");

function Decoy(creep) {

	TrooperCreep.call(this, creep);
}

Decoy.prototype = Object.create(TrooperCreep.prototype);

Decoy.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {
		if (!this.heal()) {
			TrooperCreep.prototype.act.call(this);
		}
	}
}

Decoy.prototype.attack = function() {
	this.heal();
}

Decoy.prototype.heal = function() {

	var healed = false;

	if (this.creep.hits < this.creep.hitsMax) {

		this.creep.heal(target);
		healed = true;

	} else {

		var target = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
			filter: creep => creep.hits < creep.hitsMax
		});
	
		if (target) {
	
			if (this.creep.rangedHeal(target) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(target);
			}

			healed = true;	
		}
	}

	return healed;
}

Decoy.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

	if (creepMemory) {

		creepMemory.type = "decoy";
		creepMemory.bodyPartsType = "healerTough";
		creepMemory.minimumSpawnCapacity = 450;
		creepMemory.maximumSpawnCapacity = 450;
	}

	return creepMemory;
}


module.exports = Decoy