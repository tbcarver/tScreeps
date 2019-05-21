
var CustomCreep = require("../customCreep");
var roomTools = require("../../tools/roomTools");

function StorageEnergizer(creep) {

	CustomCreep.call(this, creep);
}

StorageEnergizer.prototype = Object.create(CustomCreep.prototype);

StorageEnergizer.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {
				this.state = "harvesting";
			}

			var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: container => container.structureType === STRUCTURE_CONTAINER &&
					roomTools.isDropContainer(container) &&
					container.store[RESOURCE_ENERGY] / container.storeCapacity > .65
			});

			if (container) {

				if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(container);
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

StorageEnergizer.initializeSpawnCreepMemory = function(room, creepsCurrentCount) {

	var creepMemory;
	
	var targets = room.find(FIND_STRUCTURES, {
		filter: { structureType: STRUCTURE_CONTAINER }
	});

	if (targets.length > 0) {

		var creepMemory = {
			type: "storageEnergizer",
			bodyPartsType: "moveCarry",
			maximumSpawnCapacity: 600,
			minimumSpawnCapacity: 450,
		}
	}

	return creepMemory;
}

module.exports = StorageEnergizer