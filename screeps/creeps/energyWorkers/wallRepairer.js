
var EnergyCreep = require("../baseCreeps/energyCreep");

class WallRepairer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		super.act();
	}

	energyAct() {

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

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

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
}


module.exports = WallRepairer