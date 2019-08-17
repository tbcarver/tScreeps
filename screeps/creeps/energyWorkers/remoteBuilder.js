
var roomTools = require("../../tools/roomTools");
var Builder = require("./builder");
var EnergyCreep = require("../baseCreeps/energyCreep");
var RemoteEnergyWorker = require("./remoteEnergyWorker");

class RemoteBuilder extends RemoteEnergyWorker {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canBuild = true;
	}

	energyAct() {

		Builder.prototype.energyAct.call(this);
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory;

		if (room.find && roomTools.hasConstructionSites(room.name)) {

			creepMemory = {
				type: "remoteBuilder",
				bodyPartsType: "moveCarryWork",
				maximumSpawnCapacity: 800,
			};
			
			creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);
		}

		return creepMemory;
	}
}


module.exports = RemoteBuilder