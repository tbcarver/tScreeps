
var RemoteCreep = require("../baseCreeps/remoteCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");

function RemoteSpawnedHarvester(creep) {

	RemoteCreep.call(this, creep);
}

RemoteSpawnedHarvester.prototype = Object.create(RemoteCreep.prototype);

RemoteSpawnedHarvester.prototype.act = function() {
	
	if (this.state === "movingToSpawnedRoom") {
		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
		if (dropFlag) {
			this.state = "transferring";
		}
	}

	RemoteCreep.prototype.act.call(this);
}

RemoteSpawnedHarvester.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "transferring";
}

RemoteSpawnedHarvester.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedHarvester.prototype.spawnedRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		this.moveToRemoteRoom();

	} else if (this.state === "transferring") {

		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
		if (dropFlag) {
			if (this.creep.pos.inRangeTo(dropFlag, 1)) {
				this.creep.drop(RESOURCE_ENERGY);
				this.moveToRemoteRoom();
			} else {
				this.creep.moveTo(dropFlag);
			}
		} else {

			if (this.creepsSpawnRule.canEnergizersTransferToStorageOnly) {

				var storage = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: { structureType: STRUCTURE_STORAGE }
				});

			} else {

				var storage = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: storage => (storage.structureType === STRUCTURE_CONTAINER ||
						storage.structureType === STRUCTURE_STORAGE) &&
						(this.spawnedRoomCreepsSpawnRule.canEnergizersTransferToDropContainers || !roomTools.isDropContainer(storage, 2)) &&
						storage.storeCapacity - storage.store[RESOURCE_ENERGY] > this.creep.carry[RESOURCE_ENERGY]
				});
			}

			if (storage) {
				var transferResult = this.creep.transfer(storage, RESOURCE_ENERGY);

				if (transferResult == ERR_NOT_IN_RANGE) {

					this.creep.moveTo(storage);

				} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

					this.moveToRemoteRoom();
				}
			} else {
				debug.warning(`${this.type} ${this.creep.name} can't find any storage`);
			}
		}
	}
}

RemoteSpawnedHarvester.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToSpawnedRoom();

	} else if (this.state === "harvesting") {

		var resource = this.creep.pos.findClosestByPath(FIND_SOURCES);

		if (resource) {

			if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(resource);
			}
		} else {

			// debug.warning(`${this.type} ${this.creep.name} energy not found`);
		}
	} else {
		debug.warning(`${this.type} ${this.creep.name} spawnedRoomAct called with unknown state: ${this.state}`);
	}
}

RemoteSpawnedHarvester.prototype.unknownRoomAct = function() {

	var acted = false;

	if (this.state === "transferring") {
		
		this.spawnedRoomAct();
		acted = true;
	}

	return acted;
}

RemoteSpawnedHarvester.initializeSpawnCreepMemory = function() {

	var creepMemory = {
		type: "remoteSpawnedHarvester",
		bodyPartsType: "moveCarryWork",
		maximumSpawnCapacity: 850,
	}

	return creepMemory;
}

module.exports = RemoteSpawnedHarvester