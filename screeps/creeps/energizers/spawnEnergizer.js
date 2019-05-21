
var Energizer = require("./energizer");

function SpawnEnergizer(creep) {

	Energizer.call(this, creep);

	this.canHarvest = true;
}

SpawnEnergizer.prototype = Object.create(Energizer.prototype);

SpawnEnergizer.prototype.act = function() {

	Energizer.prototype.act.call(this);
}

SpawnEnergizer.prototype.energize = function() {

	var targetStructure = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_TOWER &&
		structure.energy < structure.energyCapacity
	});

	if (!targetStructure) {
		targetStructure = spawn;
	}

	var transferResult = this.creep.transfer(targetStructure, RESOURCE_ENERGY);

	if (transferResult == ERR_NOT_IN_RANGE) {

		this.creep.moveTo(targetStructure);

	} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .20) {

		this.state = "harvesting";
	}
}

SpawnEnergizer.initializeSpawnCreepMemory = function(room, creepsCurrentCount) {

	var creepMemory = {
		type: "spawnEnergizer",
		bodyPartsType: "energizer",
		maximumSpawnCapacity: 450,
	}

	return creepMemory;
}

module.exports = SpawnEnergizer