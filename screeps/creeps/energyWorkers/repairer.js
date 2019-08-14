
var EnergyCreep = require("../baseCreeps/energyCreep");

class Repairer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		return super.act();
	}

	energyAct() {

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

			if (this.creep.carry.energy / this.creep.carryCapacity < .30) {

				this.state = "harvesting";
			}
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

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
					maximumSpawnCapacity: 700,
				}

				creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, creepMemory, room, spawn);
			}
		}

		return creepMemory;
	}
}


module.exports = Repairer