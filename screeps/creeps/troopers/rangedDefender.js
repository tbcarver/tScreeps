
var CustomCreep = require("../customCreep");

function RangedDefender(creep) {

	CustomCreep.call(this, creep);
}

RangedDefender.prototype = Object.create(CustomCreep.prototype);

RangedDefender.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		target = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

		if (target) {

			if (this.creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(target);
			}
		} else {

			this.creep.moveTo(this.creep.room.controller);
		}
	}
}

RangedDefender.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory;

	if (creepsSpawnRule.minDefendersWaiting && currentSpawnedCount < creepsSpawnRule.minDefendersWaiting) {

		creepMemory = {
			type: "rangedDefender",
			bodyPartsType: "rangedAttack",
			maximumSpawnCapacity: 1600,
			minimumSpawnCapacity: 800,
		}
	}

	if (!creepMemory && room.find) {

		var targets = room.find(FIND_HOSTILE_CREEPS);

		if (targets.length > 0) {

			creepMemory = {
				type: "rangedDefender",
				bodyPartsType: "rangedAttack",
				maximumSpawnCapacity: 800,
				minimumSpawnCapacity: 800,
			}
		}
	}

	return creepMemory;
}


module.exports = RangedDefender