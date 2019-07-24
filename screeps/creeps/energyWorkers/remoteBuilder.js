

var RemoteEnergyWorker = require("./remoteEnergyWorker");

class RemoteBuilder extends RemoteEnergyWorker {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		super.act();
	}

	work() {

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

	static initializeSpawnCreepMemory(room) {

		var creepMemory;

		if (room.find) {

			const targets = room.find(FIND_CONSTRUCTION_SITES);

			if (targets.length > 0) {

				creepMemory = {
					type: "remoteBuilder",
					bodyPartsType: "moveCarryWork",
					maximumSpawnCapacity: 800,
				}
			}
		}

		return creepMemory;
	}
}


module.exports = RemoteBuilder