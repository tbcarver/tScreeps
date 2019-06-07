
var EnergyCreep = require("../baseCreeps/energyCreep");

function Repairer(creep) {

	EnergyCreep.call(this, creep);
}

Repairer.prototype = Object.create(EnergyCreep.prototype);

Repairer.prototype.act = function() {

	EnergyCreep.prototype.act.call(this);
}

Repairer.prototype.energyAct = function() {

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

Repairer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory;

	if (room.find) {

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

			creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, creepMemory, room, spawn, creepsSpawnRule);
		}
	}

	return creepMemory;
}


module.exports = Repairer