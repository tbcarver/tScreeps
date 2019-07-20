
var RemoteCreep = require("../baseCreeps/remoteCreep");
var flagTools = require("../../tools/flagTools");
var roomTools = require("../../tools/roomTools");
var orderBy = require("lodash/orderBy");


function BaseRemoteStorageTransferer(creep) {

	RemoteCreep.call(this, creep);

	this.canPickup = false;
	if (this.creepsSpawnRule && this.creepsSpawnRule.canRemoteStorageTransferersPickup) {
		this.canPickup = true;
	}

	this.canTransferToStorageOnly = false;
	if (this.spawnedRoomCreepsSpawnRule && this.spawnedRoomCreepsSpawnRule.canTransferersTransferToStorageOnly) {
		this.canTransferToStorageOnly = true;
	}

	this.availableCarryCapacity = this.creep.carryCapacity - this.creep.carry.energy;
}

BaseRemoteStorageTransferer.prototype = Object.create(RemoteCreep.prototype);

BaseRemoteStorageTransferer.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

BaseRemoteStorageTransferer.prototype.harvest = function(moveToOtherRoom) {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		moveToOtherRoom();

	} else if (this.state === "harvesting") {

		var resource;

		if (this.canPickup) {

			if (flagTools.hasDropFlag(this.creep.room.name)) {

				var droppedResources = roomTools.GetDropFlagWritableDroppedResources(pos.roomName);

				if (droppedResources.length > 0) {
					droppedResources = orderBy(droppedResources, "writableEnergy", "desc");
					resource = resources[0];
				}

			} else {
				resource = findTools.findSourcesWritableDroppedResource(this.creep.pos, this.availableCarryCapacity);
			}
		}

		if (!resource) {
			resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure =>
					(structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] / structure.storeCapacity > .01) ||
					(structure.structureType === STRUCTURE_TERMINAL && structure.store[RESOURCE_ENERGY] / structure.storeCapacity > .01) ||
					(structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] / structure.storeCapacity > .35)
			});
		}

		if (resource) {
			if (resource.structureType) {

				if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			} else if (resource.resourceType) {

				var result = this.creep.pickup(resource);

				if (result === OK) {
					resource.writableEnergy -= this.availableCarryCapacity;
				} else if (result == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			}
		} else {

			// debug.warning("Repairer structure not found");
		}
	}
}

BaseRemoteStorageTransferer.prototype.transfer = function(moveToOtherRoom) {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		moveToOtherRoom();

	} else if (this.state === "transferring") {

		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
		if (dropFlag) {
			if (this.creep.pos.inRangeTo(dropFlag, 0)) {

				this.creep.drop(RESOURCE_ENERGY);
				moveToOtherRoom();

			} else {
				this.creep.moveTo(dropFlag);
			}
		} else {

			if (this.canTransferToStorageOnly) {

				var resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
						structure.structureType === STRUCTURE_TERMINAL) &&
						structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry[RESOURCE_ENERGY]
				});

			} else {

				var resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
						structure.structureType === STRUCTURE_TERMINAL ||
						structure.structureType === STRUCTURE_CONTAINER) &&
						((roomTools.isDropContainer(structure, 2) && structure.store[RESOURCE_ENERGY] / structure.storeCapacity < .65) ||
							(!roomTools.isDropContainer(structure, 2) && structure.store[RESOURCE_ENERGY] / structure.storeCapacity < .95))
				});
			}

			if (resource) {
				var transferResult = this.creep.transfer(resource, RESOURCE_ENERGY);

				if (transferResult == ERR_NOT_IN_RANGE) {

					this.creep.moveTo(resource);

				} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

					moveToOtherRoom();
				}
			} else {

				var waitFlag = Game.flags[`wait-${this.creep.room.name}`];
				if (waitFlag) {
					this.creep.moveTo(waitFlag);
				} else {
					debug.warning(`${this.type} ${this.creep.name} ${this.creep.room.name} can't find any resource`);
				}
			}
		}
	}
}

BaseRemoteStorageTransferer.initializeSpawnCreepMemory = function(type, room) {

	var creepMemory;

	if (room.find) {

		var resources = roomTools.GetSourcesWritableDroppedResources(room.name);

		if (resources.length === 0) {

			var resources = room.find(FIND_STRUCTURES, {
				filter: structure => structure.structureType === STRUCTURE_STORAGE ||
					structure.structureType === STRUCTURE_TERMINAL ||
					structure.structureType === STRUCTURE_CONTAINER
			});
		}

		if (resources.length > 0) {

			creepMemory = {
				type: type,
				bodyPartsType: "moveCarry",
				maximumSpawnCapacity: 750,
				minimumSpawnCapacity: 600,
			}
		}
	}

	return creepMemory;
}


module.exports = BaseRemoteStorageTransferer