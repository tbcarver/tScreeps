

var EnergyCreep = require("../baseCreeps/energyCreep");

function Builder(creep) {

	EnergyCreep.call(this, creep);
}

Builder.prototype = Object.create(EnergyCreep.prototype);

Builder.prototype.act = function() {

	EnergyCreep.prototype.act.call(this);
}

Builder.prototype.energyAct = function() {

	const target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

	if (target) {

		if (this.creep.build(target) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(target);
		}

	} else {

		if (this.creep.transfer(this.creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(this.creep.room.controller);
		}
	}
}

Builder.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory;

	if (room.find) {

		const targets = room.find(FIND_CONSTRUCTION_SITES);

		if (targets.length > 0) {
	
			creepMemory = {
				type: "builder",
				bodyPartsType: "moveCarryWork",
				maximumSpawnCapacity: 850,
			}

			creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, creepMemory, room, spawn, creepsSpawnRule);
		}
	}

	return creepMemory;
}


module.exports = Builder