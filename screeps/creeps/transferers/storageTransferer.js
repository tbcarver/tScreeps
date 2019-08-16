
var BaseCreep = require("../baseCreeps/baseCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");

class StorageTransferer extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canPickup = false;
		if (this.creepsSpawnRule && this.creepsSpawnRule.canStorageTransferersPickup) {
			this.canPickup = true;
		}

		this.availableCarryCapacity = this.creep.carryCapacity - this.creep.carry.energy;
	}

	act() {

		var acted = super.act();

		if (!acted) {

			if (this.state === "harvesting" || this.creep.carry.energy === 0) {

				if (this.state !== "harvesting") {
					this.state = "harvesting";
				}

				if (!this.isDying) {
					this.harvest();
				}
			}

			if (this.state === "energizing" || this.creep.carry.energy === this.creep.carryCapacity) {

				if (this.state !== "energizing") {
					this.state = "energizing";
				}

				this.energize();
			}

			acted = true;
		}

		return acted;
	}

	harvest() {

		var resource;

		if (this.canPickup) {
			resource = findTools.findSourcesWritableDroppedResource(this.creep.pos, this.availableCarryCapacity);
		}

		if (!resource) {
			resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
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

				var result = this.creep.pickup(resource);

				if (result === OK) {
					resource.writableAmount -= this.availableCarryCapacity;
				} else if (result == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			}
		} else if (this.canPickup) {

			var sources = roomTools.getSources(this.roomName);

			if (!roomTools.inRangeToAny(this.creep.pos, sources, 3)) {
				resource = this.creep.pos.findClosestByRange(sources);
				this.creep.moveTo(resource, {
					ignoreCreeps: true,
				});
			}
		} else {

			var waitFlag = Game.flags[`wait-${this.roomName}`];
			if (waitFlag) {
				this.creep.moveTo(waitFlag);
			} else {
				// debug.warning(`${this.type} ${this.creep.name} ${this.roomName} can't find any resource to harvest`);
			}
		}
	}

	energize() {

		var dropFlag = Game.flags[`drop-${this.roomName}`];
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

			} else if (transferResult == ERR_FULL && this.creep.carry.energy / this.creep.carryCapacity < .33) {

				this.state = "harvesting";

			} else if (transferResult !== OK) {

				var waitFlag = Game.flags[`wait-${this.roomName}`];
				if (waitFlag) {
					this.creep.moveTo(waitFlag);
				} else {
					debug.warning(`${this.type} ${this.creep.name} ${this.roomName} can't find any resource`);
				}
			}
		}
	}

	getInitialState() {
		return "harvesting";
	}

	static initializeSpawnCreepMemory(room) {

		var creepMemory;

		if (room.find) {

			var resources = room.find(FIND_DROPPED_RESOURCES, {
				filter: resource => resource.amount && resource.amount >= 100
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
					type: "storageTransferer",
					bodyPartsType: "moveCarry",
					maximumSpawnCapacity: 600,
					minimumSpawnCapacity: 450,
				}
			}
		}

		return creepMemory;
	}
}


module.exports = StorageTransferer