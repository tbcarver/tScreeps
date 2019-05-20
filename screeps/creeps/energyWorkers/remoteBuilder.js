

var RemoteEnergyWorker = require("./remoteEnergyWorker");

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

		if (this.creep.transfer(global.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(global.controller);
		}
	}
}

RemoteBuilder.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory;

	creepMemory = {
		type: "remoteBuilder",
		bodyPartsType: "moveCarryWork",
		maximumSpawnCapacity: 850,
	}

	return creepMemory;
}


module.exports = RemoteBuilder