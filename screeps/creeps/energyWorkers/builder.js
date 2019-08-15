
var roomTools = require("../../tools/roomTools");
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
				maximumSpawnCapacity: 700,
			};

			creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, creepMemory, room, spawn);
		}

		return creepMemory;
	}
}


module.exports = Builder