
var RemoteCreep = require("../baseCreeps/remoteCreep");
var roomTools = require("../../tools/roomTools");

function RemoteSpawnedPickupEnergizer(creep) {

	RemoteCreep.call(this, creep);
}

RemoteSpawnedPickupEnergizer.prototype = Object.create(RemoteCreep.prototype);

RemoteSpawnedPickupEnergizer.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteSpawnedPickupEnergizer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "energizing";
}

RemoteSpawnedPickupEnergizer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedPickupEnergizer.prototype.spawnedRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		this.moveToRemoteRoom();

	} else if (this.state === "energizing") {

		var storage = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: storage => (storage.structureType === STRUCTURE_CONTAINER ||
				storage.structureType === STRUCTURE_STORAGE) &&
				storage.store[RESOURCE_ENERGY] / storage.storeCapacity < .95
		});

		var transferResult = this.creep.transfer(storage, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(storage);

		} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

			this.moveToRemoteRoom();
		}
	}
}

RemoteSpawnedPickupEnergizer.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToSpawnedRoom();

	} else if (this.state === "harvesting") {

		var energy = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= 100
		});

		if (energy) {

			if (this.creep.pickup(energy) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(energy);
			}
		} else {

			// debug.warning("Repairer container not found");
		}
	}
}

RemoteSpawnedPickupEnergizer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "remoteSpawnedPickupEnergizer",
		bodyPartsType: "moveCarry",
		maximumSpawnCapacity: 750,
		minimumSpawnCapacity: 600,
	}

	return creepMemory;
}

module.exports = RemoteSpawnedPickupEnergizer