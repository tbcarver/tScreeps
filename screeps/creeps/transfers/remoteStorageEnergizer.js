
var RemoteCreep = require("../baseCreeps/remoteCreep");
var roomTools = require("../../tools/roomTools");

function RemoteStorageEnergizer(creep) {

	RemoteCreep.call(this, creep);

	this.canPickup = this.creepsSpawnRule.canRemoteStorageEnergizersPickup;
}

RemoteStorageEnergizer.prototype = Object.create(RemoteCreep.prototype);

RemoteStorageEnergizer.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteStorageEnergizer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "harvesting";
}

RemoteStorageEnergizer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "energizing";
}

RemoteStorageEnergizer.prototype.spawnedRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToRemoteRoom();

	} else if (this.state === "harvesting") {

		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
		if (dropFlag) {

			var resource = dropFlag.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
				filter: resource => resource.energy && resource.energy >= 100
			});

		} else {

			var resource = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
				filter: resource => resource.energy && resource.energy >= 100
			});
		}

		if (!resource) {
			resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: container => (container.structureType === STRUCTURE_STORAGE && container.store[RESOURCE_ENERGY] / container.storeCapacity > .01) ||
					(container.structureType === STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] / container.storeCapacity > .65)
			});
		}

		if (resource) {
			if (resource.structureType) {

				if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			} else if (resource.resourceType) {

				if (this.creep.pickup(resource) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			}
		} else {

			// debug.warning("Repairer container not found");
		}
	}
}

RemoteStorageEnergizer.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		this.moveToSpawnedRoom();

	} else if (this.state === "energizing") {

		var storage = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: storage => (storage.structureType === STRUCTURE_CONTAINER ||
				storage.structureType === STRUCTURE_STORAGE) &&
				((roomTools.isDropContainer(storage) && storage.store[RESOURCE_ENERGY] / storage.storeCapacity < .65) ||
					(!roomTools.isDropContainer(storage) && storage.store[RESOURCE_ENERGY] / storage.storeCapacity < .95))
		});

		var transferResult = this.creep.transfer(storage, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(storage);

		} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

			this.moveToSpawnedRoom();
		}
	}
}

RemoteStorageEnergizer.initializeSpawnCreepMemory = function(room, spawn, creepsCurrentCount) {

	var creepMemory;

	if (room.find) {

		var targets = room.find(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= 100
		});

		if (targets.length === 0) {

			var targets = room.find(FIND_STRUCTURES, {
				filter: { structureType: STRUCTURE_CONTAINER }
			});
		}

		if (targets.length > 0) {

			creepMemory = {
				type: "remoteStorageEnergizer",
				bodyPartsType: "moveCarry",
				maximumSpawnCapacity: 750,
				minimumSpawnCapacity: 600,
			}
		}
	}

	return creepMemory;
}

module.exports = RemoteStorageEnergizer