

var RemoteEnergyWorker = require("./remoteEnergyWorker");
var RemoteCreep = require("../remoteCreep");

function RemoteBuilder(creep) {

	RemoteEnergyWorker.call(this, creep);
}

RemoteBuilder.prototype = Object.create(RemoteEnergyWorker.prototype);

RemoteBuilder.prototype.act = function() {

	RemoteEnergyWorker.prototype.act.call(this);
}

RemoteBuilder.prototype.work = function() {

	const target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

	if (target) {

		if (this.creep.build(target) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(target);
		}
	} else {
		
		var transferResult = this.creep.upgradeController(this.creep.room.controller);

		if (transferResult == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(this.creep.room.controller);

		} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

			this.state = "harvesting";
		}
	}
}

RemoteBuilder.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory;

	if (RemoteCreep.hasRemoteRoom()) {

		creepMemory = {
			type: "remoteBuilder",
			bodyPartsType: "moveCarryWork",
			maximumSpawnCapacity: 850,
		}
	}

	return creepMemory;
}


module.exports = RemoteBuilder