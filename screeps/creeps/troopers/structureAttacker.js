
var { rules } = require("../../rules/rules");
var TrooperCreep = require("./trooperCreep");

function StructureAttacker(creep) {

	TrooperCreep.call(this, creep);
}

StructureAttacker.prototype = Object.create(TrooperCreep.prototype);

StructureAttacker.prototype.act = function() {
	TrooperCreep.prototype.act.call(this);
}

StructureAttacker.prototype.attack = function() {

	var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: { structureType: STRUCTURE_TOWER }
	});

	if (!target) {
		target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_SPAWN }
		});
	}

	if (target) {

		if (this.creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		}
	}
}

StructureAttacker.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

	var creepMemory = TrooperCreep.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

	if (creepMemory) {

		creepMemory.type = "structureAttacker";
		creepMemory.bodyPartsType = "rangedAttacker";
		creepMemory.maximumSpawnCapacity = rules.maximumRangedAttackerSpawnCapacity || 800;
	}

	return creepMemory;
}


module.exports = StructureAttacker