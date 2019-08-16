
var TrooperCreep = require("./trooperCreep");

class StructureRazer extends TrooperCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	attack() {

		var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: structure => !structure["my"]
		});

		if (target) {
			if (this.creep.dismantle(target) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(target);
			}
		} else {
			debug.warning(`${this.type} ${this.creep.name} no structures found`);
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

		var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {
			creepMemory.type = "structureRazer";
			creepMemory.bodyPartsType =  "moveWork";
			creepMemory.maximumSpawnCapacity = 600;

		}

		return creepMemory;
	}
}


module.exports = StructureRazer