
var EnergyCreep = require("../baseCreeps/energyCreep");

function SpawnEnergizer(creep) {

	EnergyCreep.call(this, creep);
}

SpawnEnergizer.prototype = Object.create(EnergyCreep.prototype);

SpawnEnergizer.prototype.act = function() {

	EnergyCreep.prototype.act.call(this);
}

SpawnEnergizer.prototype.energyAct = function() {

	var targetStructure = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_TOWER &&
			structure.energy < structure.energyCapacity
	});

	if (!targetStructure) {

		var targetStructure = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_SPAWN }
		});
	}

	if (targetStructure) {

		var transferResult = this.creep.transfer(targetStructure, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {
	
			this.creep.moveTo(targetStructure);
	
		} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .20) {
	
			this.state = "harvesting";
		}
	} else {
		this.creep.moveTo(this.creep.room.controller);
	}
}

SpawnEnergizer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "spawnEnergizer",
		bodyPartsType: "energizer",
		maximumSpawnCapacity: 450,
		canHarvest: creepsSpawnRule.canEnergyCreepsHarvest,
	}

	return creepMemory;
}

module.exports = SpawnEnergizer