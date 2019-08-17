
var roomTools = require("../../tools/roomTools");
var spawnTools = require("../../tools/spawnTools");
var ControllerEnergizer = require("../energizers/controllerEnergizer");
var EnergyCreep = require("../baseCreeps/energyCreep");

class Builder extends ControllerEnergizer {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canBuild = true;
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory;

		if (room.find && roomTools.hasConstructionSites(room.name)) {

			creepMemory = {
				type: "builder",
				bodyPartsType: "moveCarryWork",
				maximumSpawnCapacity: 350,
			};

			var capacity = spawnTools.calculateSpawnCapacity(spawn);
	
			if (capacity >= 550) {
				creepMemory.maximumSpawnCapacity = 550;
			}
	
			if (capacity >= 850) {
				creepMemory.maximumSpawnCapacity = 850;
			}

			creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);
		}

		return creepMemory;
	}
}


module.exports = Builder