
var BaseCreep = require("../baseCreeps/baseCreep");

function DropHarvester(creep) {

	BaseCreep.call(this, creep);
}

DropHarvester.prototype = Object.create(BaseCreep.prototype);

DropHarvester.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "harvesting") {

			if (this.memory.resourceId) {
				var resource = Game.getObjectById(this.memory.resourceId);
			} else {
				var resource = this.creep.pos.findClosestByPath(FIND_SOURCES);
			}

			if (resource) {
				if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(resource);
				}
			} else {
				debug.warning(`${this.type} no resource found, resourceId: ${this.memory.resourceId}`);
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
		state: "harvesting"
	}

	if (room.find) {

		// Evenly distribute creeps
		for (var count = 1; count <= 5; count++) {

			var resource = room.find(FIND_SOURCES, {
				filter: resource => countDropHarvestersAtResource(resource.resourceId) < count
			});

			if (resource) {

				creepMemory.resourceId = resource.resourceId;
				break;
			}
		}
	}

	return creepMemory;
}

function countDropHarvestersAtResource(resourceId) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory) => {

		if (creepMemory.type === "dropHarvester") {

			if (creepMemory.resourceId === resourceId) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}


module.exports = DropHarvester