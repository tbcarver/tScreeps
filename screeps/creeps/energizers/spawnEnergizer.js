
var Energizer = require("./energizer");

function SpawnEnergizer(creep) {

	Energizer.call(this, creep);
}

SpawnEnergizer.prototype = Object.create(Energizer.prototype);

SpawnEnergizer.prototype.act = function() {

	Energizer.prototype.act.call(this);
}

SpawnEnergizer.prototype.energize = function() {

	var transferResult = this.creep.transfer(global.spawn, RESOURCE_ENERGY);

	if (transferResult == ERR_NOT_IN_RANGE) {

		this.creep.moveTo(global.spawn);

	} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

		this.state = "harvesting";
	}
}

SpawnEnergizer.initializeSpawn = function(creepsCurrentCount) {

	var creepMemory = {
		type: "spawnEnergizer",
		bodyType: "energizer"
	}

	return creepMemory;
}

module.exports = SpawnEnergizer