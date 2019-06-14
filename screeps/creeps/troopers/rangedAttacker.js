
var BaseCreep = require("../baseCreeps/baseCreep");

function RangedAttacker(creep) {

	BaseCreep.call(this, creep);

	this.isTrooper = true;
}

RangedAttacker.prototype = Object.create(BaseCreep.prototype);

RangedAttacker.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		target = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

		if (target) {

			if (this.creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(target);
			}
		} else {
			
			if (Game.flags["post_" + this.creep.room.name]) {
				this.creep.moveTo(Game.flags["post_" + this.creep.room.name].pos);
			} else {
				this.creep.moveTo(this.creep.room.controller);
			}
		}
	}
}

RangedAttacker.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory;

	if (!rules.maximumTroopersSpawnCapacity) {
		rules.maximumRangedAttackerSpawnCapacity = 800;
	}

	if (creepsSpawnRule.minDefendersWaiting && currentSpawnedCount < creepsSpawnRule.minDefendersWaiting) {

		creepMemory = {
			type: "rangedAttacker",
			bodyPartsType: "rangedAttack",
			maximumSpawnCapacity: rules.maximumRangedAttackerSpawnCapacity,
			isTrooper: true,
		}
	}

	if (!creepMemory && room.find) {

		var targets = room.find(FIND_HOSTILE_CREEPS);

		if (targets.length > 0) {

			creepMemory = {
				type: "rangedAttacker",
				bodyPartsType: "rangedAttack",
				maximumSpawnCapacity: rules.maximumRangedAttackerSpawnCapacity,
				isTrooper: true,
			}
		}
	}

	return creepMemory;
}


module.exports = RangedAttacker