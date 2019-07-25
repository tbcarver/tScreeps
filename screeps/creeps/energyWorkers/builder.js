

var EnergyCreep = require("../baseCreeps/energyCreep");

class Builder extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		return super.act();
	}

	energyAct() {

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

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory;

		if (room.find) {

			const targets = room.find(FIND_CONSTRUCTION_SITES);

			if (targets.length > 0) {

				creepMemory = {
					type: "builder",
					bodyPartsType: "moveCarryWork",
					maximumSpawnCapacity: 700,
				}

				creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, creepMemory, room, spawn);
			}
		}

		return creepMemory;
	}
}


module.exports = Builder