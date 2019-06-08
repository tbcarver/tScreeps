
var EnergyCreep = require("../baseCreeps/energyCreep");

function WallRepairer(creep) {

	EnergyCreep.call(this, creep);
}

WallRepairer.prototype = Object.create(EnergyCreep.prototype);

WallRepairer.prototype.act = function() {

	EnergyCreep.prototype.act.call(this);
}

WallRepairer.prototype.energyAct = function() {

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
	}
}

WallRepairer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory;

	if (room.find) {

		const targets = room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_WALL ||
				structure.structureType === STRUCTURE_RAMPART
		});

		if (targets.length > 0) {

			creepMemory = {
				type: "wallRepairer",
				bodyPartsType: "moveCarryWork",
				maximumSpawnCapacity: 700,
			}

			creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, creepMemory, room, spawn, creepsSpawnRule);
		}
	}

	return creepMemory;
}


module.exports = WallRepairer