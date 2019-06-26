
var BaseCreep = require("../baseCreeps/baseCreep");
var roomTools = require("../../tools/roomTools");

function StorageTransferer(creep) {

	BaseCreep.call(this, creep);

	this.canPickup = false;
	if (this.creepsSpawnRule && this.creepsSpawnRule.canStorageTransferersPickup) {
		this.canPickup = true;
	}
}

StorageTransferer.prototype = Object.create(BaseCreep.prototype);

StorageTransferer.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {
				this.state = "harvesting";
			}

			if (this.canPickup) {
				var dropFlag = Game.flags[`drop-${this.creep.room.name}`];

				var resource = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
					filter: resource => resource.energy && resource.energy >= 100 && (!dropFlag || !dropFlag.pos.inRangeTo(resource, 3))
				});
			}

			if (!resource) {
				var resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: container => container.structureType === STRUCTURE_CONTAINER &&
						roomTools.isDropContainer(container, 2) &&
						container.store[RESOURCE_ENERGY] / container.storeCapacity > .65
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

				var waitFlag = Game.flags[`wait-${this.creep.room.name}`];
				if (waitFlag) {
					this.creep.moveTo(waitFlag);
				} else {
					// debug.warning(`${this.type} ${this.creep.name} ${this.creep.room.name} can't find any resource to harvest`);
				}
			}
		}

		if (this.state === "energizing" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			if (this.state !== "energizing") {
				this.state = "energizing";
			}

			this.energize();
		}
	}
}

StorageTransferer.prototype.energize = function() {

	var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
	if (dropFlag) {
		if (this.creep.pos.inRangeTo(dropFlag, 1)) {
			this.creep.drop(RESOURCE_ENERGY);
			this.state = "harvesting";
		} else {
			this.creep.moveTo(dropFlag);
		}
	} else {

		var resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) && !roomTools.isDropContainer(structure, 2) &&
				structure.store[RESOURCE_ENERGY] / structure.storeCapacity < .95
		});

		var transferResult = this.creep.transfer(resource, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(resource);

		} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

			this.state = "harvesting";

		} else if (transferResult !== OK) {			

			var waitFlag = Game.flags[`wait-${this.creep.room.name}`];
			if (waitFlag) {
				this.creep.moveTo(waitFlag);
			} else {
				debug.warning(`${this.type} ${this.creep.name} can't find any resource`);
			}
		}
	}
}

StorageTransferer.prototype.getInitialState = function() {
	return "harvesting";
}

StorageTransferer.initializeSpawnCreepMemory = function(room) {

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

			var creepMemory = {
				type: "storageTransferer",
				bodyPartsType: "moveCarry",
				maximumSpawnCapacity: 600,
				minimumSpawnCapacity: 450,
			}
		}
	}

	return creepMemory;
}

module.exports = StorageTransferer