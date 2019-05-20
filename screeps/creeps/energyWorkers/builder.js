

var EnergyWorker = require("./energyWorker");

function Builder(creep) {

	EnergyWorker.call(this, creep);
}

Builder.prototype = Object.create(EnergyWorker.prototype);

Builder.prototype.act = function() {

	EnergyWorker.prototype.act.call(this);
}

Builder.prototype.work = function() {

	const target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

	if (target) {

		if (this.creep.build(target) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(target);
		}

	} else {

		if (this.creep.transfer(global.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(global.controller);
		}
	}
}

Builder.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory;

	const targets = room.find(FIND_CONSTRUCTION_SITES);

	if (targets.length > 0) {

		creepMemory = {
			type: "builder",
			bodyPartsType: "moveCarryWork",
			maximumSpawnCapacity: 850,
		}
	}

	return creepMemory;
}


module.exports = Builder