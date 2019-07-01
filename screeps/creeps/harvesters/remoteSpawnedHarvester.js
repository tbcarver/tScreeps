
var RemoteCreep = require("../baseCreeps/remoteCreep");
var BaseRemoteStorageTransferer = require("../transferers/baseRemoteStorageTransferer");

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

	BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteSpawnedHarvester.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToSpawnedRoom();

	} else if (this.state === "harvesting") {

		var resource = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

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