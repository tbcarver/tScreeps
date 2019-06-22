
var BaseCreep = require("../baseCreeps/baseCreep");

function Razer(creep) {

	BaseCreep.call(this, creep);
}

Razer.prototype = Object.create(BaseCreep.prototype);

Razer.prototype.act = function() {

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

Razer.prototype.getInitialState = function() {
	return "razing";
}

Razer.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "razer",
		bodyPartsType: "moveWork",
		maximumSpawnCapacity: 600,
	}

	return creepMemory;
}


module.exports = Razer