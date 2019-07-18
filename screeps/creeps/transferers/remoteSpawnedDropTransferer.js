
var BaseRemoteStorageTransferer = require("./baseRemoteStorageTransferer");
var DropTransferer = require("./dropTransferer");

function RemoteSpawnedDropTransferer(creep) {

	BaseRemoteStorageTransferer.call(this, creep);
}

RemoteSpawnedDropTransferer.prototype = Object.create(BaseRemoteStorageTransferer.prototype);

RemoteSpawnedDropTransferer.prototype.act = function() {
	
	if (this.state === "movingToSpawnedRoom") {
		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];
		if (dropFlag) {
			this.state = "transferring";
		}
	}

	BaseRemoteStorageTransferer.prototype.act.call(this);
}

RemoteSpawnedDropTransferer.prototype.arrivedAtSpawnedRoom = function() {
	this.state = "transferring";
}

RemoteSpawnedDropTransferer.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteSpawnedDropTransferer.prototype.spawnedRoomAct = function() {

	BaseRemoteStorageTransferer.prototype.transfer.call(this, this.moveToRemoteRoom.bind(this));
}

RemoteSpawnedDropTransferer.prototype.remoteRoomAct = function() {
	
	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToSpawnedRoom();

	} else if (this.state === "harvesting") {

		DropTransferer.prototype.harvesting.call(this);
	}
}

RemoteSpawnedDropTransferer.prototype.unknownRoomAct = function() {

	var acted = false;

	if (this.state === "transferring") {
		
		this.spawnedRoomAct();
		acted = true;
	}

	return acted;
}

RemoteSpawnedDropTransferer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount) {

	var creepMemory;

	if (spawnOrderMaxSpawnedCount.creepMemory) {

		creepMemory = {
			type: "remoteSpawnedDropTransferer",
			subType: spawnOrderMaxSpawnedCount.creepSubType,
			bodyPartsType: "moveCarry",
			maximumSpawnCapacity: 750,
			minimumSpawnCapacity: 600,
		}

		creepMemory = Object.assign(creepMemory, spawnOrderMaxSpawnedCount.creepMemory);

	} else {

		var creepMemory = BaseRemoteStorageTransferer.initializeSpawnCreepMemory("remoteSpawnedDropTransferer", room);
	}

	return creepMemory;
}


module.exports = RemoteSpawnedDropTransferer