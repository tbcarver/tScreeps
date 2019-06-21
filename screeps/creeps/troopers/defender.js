
var BaseCreep = require("../baseCreeps/baseCreep");

function Defender(creep) {

	BaseCreep.call(this, creep);

	this.isTrooper = true;
}

Defender.prototype = Object.create(BaseCreep.prototype);

Defender.prototype.act = function() {
	
	if (!BaseCreep.prototype.act.call(this)) {

		if (Game.flags["post-" + this.creep.room.name]) {
			this.creep.moveTo(Game.flags["post-" + this.creep.room.name].pos);
		} else {
			this.creep.moveTo(this.creep.room.controller);
		}
	}
}

Defender.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory;

	if (!rules.maximumTroopersSpawnCapacity) {
		rules.maximumDefenderSpawnCapacity = 800;
	}

	if (creepsSpawnRule.minTroopersWaiting && currentSpawnedCount < creepsSpawnRule.minTroopersWaiting) {

		creepMemory = {
			type: "defender",
			bodyPartsType: "defender",
			isTrooper: true,
		}
	}

	if (!creepMemory && room.find) {

		var targets = room.find(FIND_HOSTILE_CREEPS);

		if (targets.length > 0) {

			creepMemory = {
				type: "defender",
				bodyPartsType: "defender",
				isTrooper: true,
			}
		}
	}

	return creepMemory;
}


module.exports = Defender