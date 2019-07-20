
var { rules } = require("../../rules/rules");
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

	var creeps = this.creep.room.find(FIND_MY_CREEPS, {
		filter: creep => creep.hits < creep.hitsMax && creep.name !== this.creep.name &&
		creep.memory.isMobTrooper
	});

	if (creeps.length > 0) {

		_.sortBy(creeps, ["hits"]);
		var creep = creeps[0];

	} else {

		var creep = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
			filter: creep => creep.hits < creep.hitsMax && creep.name !== this.creep.name
		});
	}

	if (creep) {

		if (this.creep.rangedHeal(creep) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(creep);
		}
		healed = true;

	} else if (this.creep.hits < this.creep.hitsMax) {
		this.creep.heal(creep);
		healed = true;
	}

	return healed;
}

Healer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {


	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

	if (creepMemory) {

		creepMemory.type = "healer";
		creepMemory.bodyPartsType = "healer";
		creepMemory.maximumSpawnCapacity = rules.maximumHealerSpawnCapacity || 800;
	}

	return creepMemory;
}


module.exports = Healer