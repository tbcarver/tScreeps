
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
			filter: structure => structure.structureType === STRUCTURE_WALL &&
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

		if (this.creep.transfer(global.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(global.controller);
		}
	}
}

WallRepairer.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory;

	const targets = global.room.find(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_WALL
	});

	if (targets.length > 0) {

		creepMemory = {
			type: "wallRepairer",
			bodyPartsType: "energyWorker"
		}
	}

	return creepMemory;
}


module.exports = WallRepairer