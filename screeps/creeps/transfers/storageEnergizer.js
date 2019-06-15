
var BaseCreep = require("../baseCreeps/baseCreep");
var roomTools = require("../../tools/roomTools");

function StorageEnergizer(creep) {

	BaseCreep.call(this, creep);

	this.canPickup = this.creepsSpawnRule.canStorageEnergizersPickup;
}

StorageEnergizer.prototype = Object.create(BaseCreep.prototype);

StorageEnergizer.prototype.act = function() {

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
						roomTools.isDropContainer(container) &&
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

				// debug.warning("Repairer container not found");
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

StorageEnergizer.prototype.energize = function() {

	var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
	if (dropFlag) {
		if (this.creep.pos.inRangeTo(dropFlag, 1)) {
			this.creep.drop(RESOURCE_ENERGY);
			this.state = "harvesting";
		} else {
			this.creep.moveTo(dropFlag);
		}
	} else {

		var storage = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: storage => (storage.structureType === STRUCTURE_CONTAINER ||
				storage.structureType === STRUCTURE_STORAGE) && !roomTools.isDropContainer(storage) &&
				storage.store[RESOURCE_ENERGY] / storage.storeCapacity < .95
		});

		var transferResult = this.creep.transfer(storage, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(storage);

		} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

			this.state = "harvesting";
		}
	}
}

StorageEnergizer.prototype.getInitialState = function() {
	return "harvesting";
}

StorageEnergizer.initializeSpawnCreepMemory = function(room) {

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

			var creepMemory = {
				type: "storageEnergizer",
				bodyPartsType: "moveCarry",
				maximumSpawnCapacity: 600,
				minimumSpawnCapacity: 450,
			}
		}
	}

	return creepMemory;
}

module.exports = StorageEnergizer