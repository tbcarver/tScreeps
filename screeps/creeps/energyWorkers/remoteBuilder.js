
var roomTools = require("../../tools/roomTools");
var Builder = require("./builder");
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

	static initializeSpawnCreepMemory(room) {

		var creepMemory;

		if (room.find && roomTools.hasConstructionSites(room.name)) {

			creepMemory = {
				type: "remoteBuilder",
				bodyPartsType: "moveCarryWork",
				maximumSpawnCapacity: 800,
			};
		}

		return creepMemory;
	}
}


module.exports = RemoteBuilder