
var BaseCreep = require("../baseCreeps/baseCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");
var spawnTools = require("../../tools/spawnTools");
var orderBy = require("lodash/orderBy");


var visualizeTools = require("../../tools/visualizeTools");

function DropTransferer(creep) {

	BaseCreep.call(this, creep);

	this.canPickup = false;
	if (this.creepsSpawnRule && this.creepsSpawnRule.canDropTransferersPickup) {
		this.canPickup = true;
	}

	this.availableCarryCapacity = this.creep.carryCapacity - this.creep.carry.energy;
}

DropTransferer.prototype = Object.create(BaseCreep.prototype);

DropTransferer.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {
				this.state = "harvesting";
			}

			this.harvest();
		}

		if (this.state === "energizing" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			if (this.state !== "energizing") {
				this.state = "energizing";
			}

			this.transfer();
		}
	}
}

DropTransferer.prototype.harvest = function(transferAction) {

	var resource;

	if (this.memory.sourceId) {

		var source = Game.getObjectById(this.memory.sourceId);

		if (!this.creep.pos.inRangeTo(source, 3)) {
			this.creep.moveTo(source, {
				ignoreCreeps: true,
			});
		} else {

			var resources = roomTools.GetSourceWritableDroppedResources(this.creep.room.name, this.memory.sourceId);

			if (resources.length > 0) {

				var resource = this.creep.pos.findClosestByPath(resources, {
					filter: resource => resource.writableEnergy >= this.creep.carryCapacity
				});

				if (!resource) {

					resources = orderBy(resources, "writableEnergy", "desc");
					resource = resources[0];
				}
			}
		}

	} else if (this.canPickup) {
		resource = findTools.findSourcesWritableDroppedResource(this.creep.pos, this.availableCarryCapacity);
	}

	if (resource) {
		var result = this.creep.pickup(resource);

		if (result === OK) {

			var pickedUpAmount = resource.writableEnergy;

			if (pickedUpAmount > this.availableCarryCapacity) {
				pickedUpAmount = this.availableCarryCapacity;

				this.transfer(transferAction);
			}

			resource.writableEnergy -= pickedUpAmount;

		} else if (result == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(resource);
		}
	} else if (this.canPickup) {

		var sources = roomTools.getSources(this.creep.room.name);

		if (!roomTools.inRangeToAny(this.creep.pos, sources, 3)) {
			resource = this.creep.pos.findClosestByRange(sources);
			this.creep.moveTo(resource);
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

DropTransferer.prototype.transfer = function() {

	var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
	if (dropFlag) {
		if (this.creep.pos.inRangeTo(dropFlag, 0)) {
			this.creep.drop(RESOURCE_ENERGY);
			this.state = "harvesting";
			this.harvest();
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
			this.harvest();

		} else if (transferResult !== OK) {

			var waitFlag = Game.flags[`wait-${this.creep.room.name}`];
			if (waitFlag) {
				this.creep.moveTo(waitFlag);
			} else {
				debug.warning(`${this.type} ${this.creep.name} ${this.creep.room.name} can't find any resource`);
			}
		}
	}
}

DropTransferer.prototype.getInitialState = function() {
	return "harvesting";
}

DropTransferer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount) {

	var creepMemory;

	if (spawnOrderMaxSpawnedCount.creepMemory) {

		creepMemory = {
			type: "dropTransferer",
			subType: spawnOrderMaxSpawnedCount.creepSubType,
		}

		creepMemory = Object.assign(creepMemory, spawnOrderMaxSpawnedCount.creepMemory);

	} else if (room.find) {

		var resources = roomTools.GetSourcesWritableDroppedResources(room.name);

		if (resources.length > 0) {

			var creepMemory = {
				type: "dropTransferer",
			}
		}
	}

	if (creepMemory) {
		creepMemory.bodyPartsType = "moveCarry";
		creepMemory.maximumSpawnCapacity = 600;
		creepMemory.minimumSpawnCapacity = 450;
	}

	return creepMemory;
}

function getCountDropTransferersAtSource(sourceId) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory, creepName) => {

		if (creepMemory.type === "dropTransferer" && !spawnTools.isCreepInSpawnBuffer(Game.creeps[creepName])) {

			if (creepMemory.sourceId === sourceId) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}

module.exports = DropTransferer