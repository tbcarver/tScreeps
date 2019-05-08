
var debug = require("../debug");
var EnergyWorker = require("./energyWorker");

function Repairer(creep) {

	EnergyWorker.call(this, creep);
}

Repairer.prototype = Object.create(EnergyWorker.prototype);

Repairer.prototype.act = function() {

	EnergyWorker.prototype.act.call(this);
}

Repairer.prototype.work = function() {

	const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			structure.structureType !== STRUCTURE_WALL
	});

	if (target) {

		if (creep.repair(target) == ERR_NOT_IN_RANGE) {

			creep.moveTo(target);
		}

	} else {

		debug.warning("Repairer cannot find any damaged structures");

		if (creep.carry[RESOURCE_ENERGY] / creep.carryCapacity < .30) {

			this.state = "harvesting";
		}
	}
}

Repairer.initializeSpawn = function(creepsCurrentCount) {

	var creepMemory;

	const targets = global.room.find(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			structure.structureType !== STRUCTURE_WALL
	});

	if (targets.length >= 6) {

		creepMemory = {
			type: "repairer",
			bodyType: "worker"
		}
	}

	return creepMemory;
}


module.exports = Repairer