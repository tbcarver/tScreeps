
var TrooperCreep = require("./trooperCreep");

function StructureRazer(creep) {

	TrooperCreep.call(this, creep);
}

StructureRazer.prototype = Object.create(TrooperCreep.prototype);

StructureRazer.prototype.act = function() {
	TrooperCreep.prototype.act.call(this);
}

StructureRazer.prototype.attack = function() {

	var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: structure => !structure.my
	});

	if (target) {
		if (this.creep.dismantle(target) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		}
	} else {
		debug.warning(`${this.type} ${this.creep.name} no structures found`);
	}
}

StructureRazer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, currentSpawnedCount);

	var creepMemory = {
		type: "structureRazer",
		bodyPartsType: "moveWork",
		maximumSpawnCapacity: 600,
	}

	return creepMemory;
}


module.exports = StructureRazer