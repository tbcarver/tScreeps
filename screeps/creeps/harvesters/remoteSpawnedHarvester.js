
var RemoteCreep = require("../baseCreeps/remoteCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");

function RemoteSpawnedHarvester(creep) {

	RemoteCreep.call(this, creep);
}

RemoteSpawnedHarvester.prototype = Object.create(RemoteCreep.prototype);

RemoteSpawnedHarvester.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteSpawnedHarvester.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "transferring";
}

RemoteSpawnedHarvester.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedHarvester.prototype.spawnedRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		this.moveToRemoteRoom();

	} else if (this.state === "transferring") {

		var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: container => (container.structureType === STRUCTURE_CONTAINER ||
				container.structureType === STRUCTURE_STORAGE) &&
				container.store[RESOURCE_ENERGY] / container.storeCapacity < .80
		});

		if (this.creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(container);
		}
	} else {
		debug.warning(`${this.type} spawnedRoomAct called with unknown state: ${this.state}`);
	}
}

RemoteSpawnedHarvester.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToSpawnedRoom();

	} else if (this.state === "harvesting") {

		var resource = this.creep.pos.findClosestByPath(FIND_SOURCES);

		if (resource) {

			if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(resource);
			}
		} else {

			// debug.warning(`${this.type} energy not found`);
		}
	} else {
		debug.warning(`${this.type} spawnedRoomAct called with unknown state: ${this.state}`);
	}
}

RemoteSpawnedHarvester.initializeSpawnCreepMemory = function() {

	var creepMemory = {
		type: "remoteSpawnedHarvester",
		bodyPartsType: "moveCarryWork",
		maximumSpawnCapacity: 850,
	}

	return creepMemory;
}

module.exports = RemoteSpawnedHarvester