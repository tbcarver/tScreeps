
var EnergyWorker = require("./energyWorker");

function WallRepairer(creep) {

	EnergyWorker.call(this, creep);
}

WallRepairer.prototype = Object.create(EnergyWorker.prototype);

WallRepairer.prototype.act = function() {

	EnergyWorker.prototype.act.call(this);
}

WallRepairer.prototype.work = function() {

	var target;

	for (var count = 1; count <= 150; count++) {

		target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_WALL ||
				structure.structureType === STRUCTURE_RAMPART) &&
				structure.hits < (2000 * count)
		});

		if (target) {
			break;
		}
	}

	if (target) {

		if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(target);
		}

	} else {

		if (this.creep.transfer(this.creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(this.creep.room.controller);
		}
	}
}

WallRepairer.initializeSpawnCreepMemory = function(room) {

	var creepMemory;

	const targets = room.find(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_WALL ||
			structure.structureType === STRUCTURE_RAMPART
	});

	if (targets.length > 0) {

		creepMemory = {
			type: "wallRepairer",
			bodyPartsType: "moveCarryWork",
			maximumSpawnCapacity: 850,
		}
	}

	return creepMemory;
}


module.exports = WallRepairer