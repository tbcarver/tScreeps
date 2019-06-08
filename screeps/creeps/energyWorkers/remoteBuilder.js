

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

		if (this.creep.transfer(this.creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(this.creep.room.controller);
		}
	}
}

RemoteBuilder.initializeSpawnCreepMemory = function(room) {

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


module.exports = RemoteBuilder