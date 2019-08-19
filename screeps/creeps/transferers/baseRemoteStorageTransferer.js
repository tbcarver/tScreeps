
var RemoteCreep = require("../baseCreeps/remoteCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");
var orderBy = require("lodash/orderBy");

class BaseRemoteStorageTransferer extends RemoteCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.availableCarryCapacity = this.creep.carryCapacity - this.creep.carry.energy;
	}

	harvest(moveToOtherRoom) {

		if (this.state !== "harvesting") {
			this.state = "harvesting";
		}

		if (this.creep.carry.energy === this.creep.carryCapacity) {

			moveToOtherRoom();

		} else if (this.state === "harvesting") {

			var resource;

			if (roomTools.hasDropFlag(this.roomName)) {

				var droppedResources = roomTools.GetDropFlagWritableDroppedResources(this.roomName);

				if (droppedResources.length > 0) {
					resource = droppedResources[0];
				}
			}

			if (!resource) {
				resource = findTools.findClosestStoredEnergy(this.creep.pos, this.availableCarryCapacity);
			}

			if (resource) {

				if (this.isInTravelDistance(resource)) {
					this.travelNearTo(resource);
				} else {

					if (resource.structureType) {

						let result = this.creep.withdraw(resource, RESOURCE_ENERGY);
						if (result === OK) {

							if (resource.store.energy >= this.availableCarryCapacity * 2) {
								moveToOtherRoom();
							}
						} else if (result == ERR_NOT_IN_RANGE) {
							this.creep.moveTo(resource);
						}
					} else if (resource.resourceType) {

						let result = this.creep.pickup(resource);
						if (result === OK) {

							var pickedUpAmount = resource.writableAmount;

							if (pickedUpAmount >= this.availableCarryCapacity) {
								pickedUpAmount = this.availableCarryCapacity;
								moveToOtherRoom();
							}

							resource.writableAmount -= pickedUpAmount;

						} else if (result == ERR_NOT_IN_RANGE) {
							this.creep.moveTo(resource);
						}
					}
				}
			} else {

				// debug.warning("Repairer structure not found");
			}
		}
	}

	transfer(moveToOtherRoom) {

		if (this.state !== "transferring") {
			this.state = "transferring";
		}

		if (this.creep.carry.energy === 0) {

			moveToOtherRoom();

		} else if (this.state === "transferring") {

			if (roomTools.hasMinimumStorageCapacity(this.roomName)) {

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

							moveToOtherRoom();

						} else {
							debug.warning(`${this.type} ${this.creep.name} ${this.roomName} couldn't transfer energy ${transferResult}`);
						}
					}
				} else {

					var waitFlag = Game.flags[`wait-${this.roomName}`];
					if (waitFlag) {
						if (this.isInTravelDistance(waitFlag)) {
							this.travelTo(waitFlag);
						} else if (this.isInTravelDistance(waitFlag, 2)) {
							this.creep.moveTo(waitFlag);
						}
					} else {
						debug.warning(`${this.type} ${this.creep.name} ${this.roomName} can't find any resource`);
					}
				}
			}
			else {
				var dropFlag = roomTools.getDropFlag(this.roomName);
				if (dropFlag) {
					if (this.isInTravelDistance(dropFlag)) {
						this.travelNearTo(dropFlag);

					} else if (this.creep.pos.inRangeTo(dropFlag, 0)) {

						this.creep.drop(RESOURCE_ENERGY);
						moveToOtherRoom();

					} else {
						this.creep.moveTo(dropFlag);
					}
				}
			}
		}
	}

	static initializeSpawnCreepMemory(type, room) {

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
}


module.exports = BaseRemoteStorageTransferer