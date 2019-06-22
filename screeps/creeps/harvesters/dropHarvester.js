
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
				debug.warning(`${this.type} ${this.creep.name} no resource found, resourceId: ${this.memory.resourceId}`);
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
		bodyPartsType: "moveWork",
		state: "harvesting",
		maximumSpawnCapacity: 500,
	}

	if (room.find) {

		var resources = room.find(FIND_SOURCES);
		var countDropHarvesters = {};

		for (var resource of resources) {
			countDropHarvesters[resource.id] = countDropHarvestersAtResource(resource.id);
		}

		if (room.name !== spawn.room.name) {
			var exitFlag = Game.flags[`exit-from-${room.name}-to-${spawn.room.name}`];
			if (exitFlag) {
				resources.sort((resourceA, resourceB) => resourceA.pos.getRangeTo(exitFlag) > resourceB.pos.getRangeTo(exitFlag));
			}
		}

		// Evenly distribute creeps
		var found = false;
		for (var count = 1; count <= 10; count++) {
			for (var resource of resources) {
				if (countDropHarvesters[resource.id] < count) {

					creepMemory.resourceId = resource.id;
					found = true;
					break;
				};
			}
			if (found) {
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