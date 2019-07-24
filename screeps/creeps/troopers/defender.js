
var TrooperCreep = require("./trooperCreep");

class Defender extends TrooperCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		super.act();
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

		var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {

			creepMemory.type = "defender";
			creepMemory.bodyPartsType = "defender";
			creepMemory.maximumSpawnCapacity = rules.maximumTroopersSpawnCapacity || 800;
		}

		return creepMemory;
	}
}


module.exports = Defender