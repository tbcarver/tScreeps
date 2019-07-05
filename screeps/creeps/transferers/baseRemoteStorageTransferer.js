
var RemoteCreep = require("../baseCreeps/remoteCreep");
var roomTools = require("../../tools/roomTools");

function BaseRemoteStorageTransferer(creep) {

	RemoteCreep.call(this, creep);

	this.canPickup = false;
	if (this.creepsSpawnRule && this.creepsSpawnRule.canRemoteStorageTransferersPickup) {
		this.canPickup = true;
	}

	this.canTransferToStorageOnly = false;
	if (this.creepsSpawnRule && this.creepsSpawnRule.canEnergizersTransferToStorageOnly) {
		this.canTransferToStorageOnly = true;
	}
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

			var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
			if (dropFlag) {

				var resources = dropFlag.pos.findInRange(FIND_DROPPED_RESOURCES, 3);
				if (resources.length > 0) {
					resource = resources[0];
				}

			} else {

				resource = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
					filter: resource => resource.energy && resource.energy >= 100
				});
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

				if (this.creep.pickup(resource) == ERR_NOT_IN_RANGE) {
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
			if (this.creep.pos.inRangeTo(dropFlag, 1)) {

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

		var resources = room.find(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= 100
		});

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