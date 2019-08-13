
var BaseCreep = require("../baseCreeps/baseCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");
var spawnTools = require("../../tools/spawnTools");
var orderBy = require("lodash/orderBy");

class DropTransferer extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.availableCarryCapacity = this.creep.carryCapacity - this.creep.carry.energy;
	}

	act() {

		var acted = super.act();

		if (!acted) {

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

			acted = true;
		}

		return acted;
	}

	harvest(moveToOtherRoom) {

		var resource;

		if (this.memory.sourceId) {

			var source = Game.getObjectById(this.memory.sourceId);

			if (this.isInTravelDistance(source)) {
				this.travelNearTo(source);

			} else {

				var resources = /** @type {RoomObject[]} */ (roomTools.GetSourceWritableDroppedResources(this.creep.room.name, this.memory.sourceId));

				if (resources.length > 0) {

					resource = this.creep.pos.findClosestByPath(resources, {
						filter: resource => resource.writableAmount >= this.creep.carryCapacity
					});

					if (!resource) {

						resources = orderBy(resources, "writableAmount", "desc");
						resource = resources[0];
					}
				} else {

					resources = roomTools.getSourcesWritableDropContainers(this.creep.room.name, this.memory.sourceId);

					if (resources.length > 0) {

						resources = orderBy(resources, "writableAmount", "desc");
						resource = resources[0];
					}
				}
			}

		} else {
			resource = findTools.findSourcesWritableDroppedResource(this.creep.pos, this.availableCarryCapacity);

			if (this.isInTravelDistance(resource)) {
				this.travelNearTo(resource);
				resource = undefined;
			}
		}

		if (resource) {

			var result;
			if (resource.structureType) {

				result = this.creep.withdraw(resource, RESOURCE_ENERGY);
				if (result === OK) {

					var withdrawnEnergy = resource.writableAmount;

					if (resource.energyCapacity > this.availableCarryCapacity) {
						withdrawnEnergy = this.availableCarryCapacity;
						this.state = "energizing";
						this.transfer(moveToOtherRoom);
					}

					resource.writableAmount -= withdrawnEnergy;
				}

			} else {

				result = this.creep.pickup(resource);
				if (result === OK) {

					var pickedUpAmount = resource.writableAmount;

					if (pickedUpAmount > this.availableCarryCapacity) {
						pickedUpAmount = this.availableCarryCapacity;
						this.state = "energizing";
						this.transfer(moveToOtherRoom);
					}

					resource.writableAmount -= pickedUpAmount;
				}
			}

			if (result == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(resource);
			}

		} else {
			this.travelToWaitFlag();
		}
	}

	transfer(moveToOtherRoom) {

		if (roomTools.hasMinimumStorageCapacity(this.creep.room.name)) {

			var resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
					structure.structureType === STRUCTURE_TERMINAL) &&
					structure.store[RESOURCE_ENERGY] / structure.storeCapacity < .95
			});

			if (resource) {

				if (this.isInTravelDistance(resource)) {
					this.travelNearTo(resource);

				} else {

					var transferResult = this.creep.transfer(resource, RESOURCE_ENERGY);

					if (transferResult === ERR_NOT_IN_RANGE) {

						this.creep.moveTo(resource);

					} else if (transferResult === OK) {

						this.state = "harvesting";
						this.harvest();

					} else {
						debug.warning(`${this.type} ${this.creep.name} ${this.creep.room.name} couldn't transfer energy ${transferResult}`);
					}
				}
			} else {

				var waitFlag = Game.flags[`wait-${this.creep.room.name}`];
				if (waitFlag) {
					this.creep.moveTo(waitFlag);
				} else {
					debug.warning(`${this.type} ${this.creep.name} ${this.creep.room.name} can't find any resource`);
				}
			}
		} else {

			var dropFlag = roomTools.getDropFlag(this.creep.room.name);
			if (dropFlag) {

				if (this.isInTravelDistance(dropFlag)) {
					this.travelNearTo(dropFlag);

				} else if (this.creep.pos.inRangeTo(dropFlag, 0)) {

					this.creep.drop(RESOURCE_ENERGY);
					this.state = "harvesting";
					this.harvest();

				} else {
					this.creep.moveTo(dropFlag);
				}
			}
		}
	}

	getInitialState() {
		return "harvesting";
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount) {

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

				creepMemory = {
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