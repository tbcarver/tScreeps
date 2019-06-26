
var BaseCreep = require("../baseCreeps/baseCreep");

function StructureRazer(creep) {

	BaseCreep.call(this, creep);
}

StructureRazer.prototype = Object.create(BaseCreep.prototype);

StructureRazer.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "razing") {

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
	}
}

StructureRazer.prototype.getInitialState = function() {
	return "razing";
}

StructureRazer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "structureRazer",
		bodyPartsType: "moveWork",
		maximumSpawnCapacity: 600,
	}

	return creepMemory;
}


module.exports = StructureRazer