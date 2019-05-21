
var RemoteCreep = require("../remoteCreep");
var findTools = require("../../tools/findTools");
var roomTools = require("../../tools/roomTools");

function RemoteHarvester(creep) {

	RemoteCreep.call(this, creep);
}

RemoteHarvester.prototype = Object.create(RemoteCreep.prototype);

RemoteHarvester.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteHarvester.prototype.arrivedAtRoom = function() {
	this.state = "transferring";
}

RemoteHarvester.prototype.arrivedAtRemoteRoom = function() {
	this.state = "harvesting";
}

RemoteHarvester.prototype.roomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === 0) {

		this.moveToRemoteRoom();

	} else if (this.state === "transferring"){

		var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: container => (container.structureType === STRUCTURE_CONTAINER ||
				container.structureType === STRUCTURE_STORAGE) &&
				container.store[RESOURCE_ENERGY] / container.storeCapacity < .80 &&
				!roomTools.isDropContainer(container)
		});
	
		if (this.creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	
			this.creep.moveTo(container);
		}
	} else {
		debug.warning(`${this.type} roomAct called with unknown state: ${this.state}`);
	}
}

RemoteHarvester.prototype.remoteRoomAct = function() {

	if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

		this.moveToRoom();

	} else if (this.state === "harvesting"){

		var resource = findTools.findClosestEnergy(this.creep.pos);

		if (resource) {

			if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(resource);
			}
		} else {

			debug.warning(`${this.type} energy not found`);
		}
	} else {
		debug.warning(`${this.type} roomAct called with unknown state: ${this.state}`);
	}
}

RemoteHarvester.initializeSpawnCreepMemory = function(room, creepsCurrentCount) {

	var creepMemory;

	if (RemoteCreep.hasRemoteRoom()) {

		creepMemory = {
			type: "remoteHarvester",
			bodyPartsType: "moveCarryWork"
		}
	}

	return creepMemory;
}

module.exports = RemoteHarvester