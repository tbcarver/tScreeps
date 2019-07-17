
var TrooperCreep = require("./trooperCreep");

function Defender(creep) {

	TrooperCreep.call(this, creep);

	this.isTrooper = true;
}

Defender.prototype = Object.create(TrooperCreep.prototype);

Defender.prototype.act = function() {
	
	TrooperCreep.prototype.act.call(this);
}

Defender.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

	if (creepMemory) {
			
		creepMemory.type = "defender";
		creepMemory.bodyPartsType = "defender";
		creepMemory.maximumSpawnCapacity = rules.maximumTroopersSpawnCapacity || 800;
	}

	return creepMemory;
}


module.exports = Defender