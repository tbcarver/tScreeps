
var RemoteCreep = require("../remoteCreep");

function RemoteSitter(creep) {

	RemoteCreep.call(this, creep);
}

RemoteSitter.prototype = Object.create(RemoteCreep.prototype);

RemoteSitter.prototype.act = function() {

	RemoteCreep.prototype.act.call(this);
}

RemoteSitter.prototype.arrivedAtSpawnedRoom = function() {
}

RemoteSitter.prototype.arrivedAtRemoteRoom = function() {
	this.state = "sitting";
}

RemoteSitter.prototype.spawnedRoomAct = function() {
}

RemoteSitter.prototype.remoteRoomAct = function() {

	var controller = this.creep.room.controller;

	if (controller) {

		this.creep.moveTo(controller);
		
	} else {

		debug.warning(`${this.type} can't find remote controller`);
	}
}

RemoteSitter.initializeSpawnCreepMemory = function() {

	var creepMemory = {
		type: "remoteSitter",
		bodyPartsType: "move",
	}

	return creepMemory;
}

module.exports = RemoteSitter