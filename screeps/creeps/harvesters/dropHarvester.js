
var BaseCreep = require("../baseCreeps/baseCreep");

function DropHarvester(creep) {

	BaseCreep.call(this, creep);
}

DropHarvester.prototype = Object.create(BaseCreep.prototype);

DropHarvester.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "harvesting") {

			var resource = this.creep.pos.findClosestByPath(FIND_SOURCES);

			if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(resource);
			}
		}
	}
}

DropHarvester.prototype.getInitialState = function() {
	return "harvesting";
}

DropHarvester.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory = {
		type: "dropHarvester",
		bodyPartsType: "workDropper",
		state: "harvesting",
	}

	return creepMemory;
}


module.exports = DropHarvester