
var EnergyWorker = require("./energyWorker");

function Repairer(creep) {

	EnergyWorker.call(this, creep);
}

Repairer.prototype = Object.create(EnergyWorker.prototype);

Repairer.prototype.act = function() {

	EnergyWorker.prototype.act.call(this);
}

Repairer.prototype.work = function() {

	const target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			!(structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART)
	});

	if (target) {

		if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(target);
		}

	} else {

		// debug.warning("Repairer cannot find any damaged structures");

		if (this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

			this.state = "harvesting";
		}
	}
}

Repairer.initializeSpawnCreepMemory = function(room) {

	var creepMemory;

	const targets = room.find(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			!(structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART)
	});

	if (targets.length >= 1) {

		creepMemory = {
			type: "repairer",
			bodyPartsType: "moveCarryWork",
			maximumSpawnCapacity: 850,
		}
	}

	return creepMemory;
}


module.exports = Repairer