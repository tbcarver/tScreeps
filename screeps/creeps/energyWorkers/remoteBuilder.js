
var roomTools = require("../../tools/roomTools");
var spawnTools = require("../../tools/spawnTools");
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


module.exports = RemoteBuilder