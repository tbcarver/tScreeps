
var BaseCreep = require("../baseCreeps/baseCreep");
var roomTools = require("../../tools/roomTools");

function DropContainerHarvester(creep) {

	BaseCreep.call(this, creep);
}

DropContainerHarvester.prototype = Object.create(BaseCreep.prototype);

DropContainerHarvester.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "arrivedAtRemoteRoom") {
			this.state = "moving";
		}

		if (this.state === "harvesting") {

			var resource = Game.getObjectById(this.memory.resourceId);
			var container = Game.getObjectById(this.memory.containerId);

			if (resource && container) {

				var result = this.creep.harvest(resource);

				if (!(result === OK || result === ERR_NOT_ENOUGH_RESOURCES)) {

					debug.danger("dropContainerHarvester harvest failed:", result);
				}
			} else {

				debug.danger("dropContainerHarvester resource or container not found:",
					this.memory.resourceId, this.memory.containerId);
			}
		}

		if (this.state === "moving") {

			var container = Game.getObjectById(this.memory.containerId);

			var result = this.creep.moveTo(container);

			if (result !== OK) {

				debug.danger("dropContainerHarvester move failed:", result);
			}

			if (this.creep.pos.x === container.pos.x && this.creep.pos.y === container.pos.y) {

				this.state = "harvesting";
			}
		}
	}
}

DropContainerHarvester.prototype.getInitialState = function() {
	return "moving";
}

DropContainerHarvester.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule) {

	var creepMemory
	var container;

	if (room.find) {

		var containers = room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
				roomTools.isDropContainer(structure)
		});

		containers = containers.filter(container => {

			var countEnergizers = countDropContainerHarvestersAtContainerPosition(container.pos.x, container.pos.y);

			return countEnergizers < 1;
		});

		if (containers.length > 0) {

			container = containers[0];
		}

		if (container) {

			var resource = container.pos.findClosestByRange(FIND_SOURCES);

			if (resource) {

				creepMemory = {
					type: "dropContainerHarvester",
					bodyPartsType: "moveWork",
					state: "moving",
					maximumSpawnCapacity: 500,
					minimumSpawnCapacity: 500,
					resourceId: resource.id,
					containerId: container.id,
					containerPos: container.pos
				};

			} else {

				debug.warning(`dropContainerHarvester did not spawn no resources found`);
			}
		}
	}

	return creepMemory;
}

function countDropContainerHarvestersAtContainerPosition(x, y) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory, creepName) => {

		if (creepMemory.type === "dropContainerHarvester" && Game.creeps[creepName].ticksToLive > rules.creepsTickToLiveSpawnBuffer) {

			if (creepMemory.containerPos.x === x && creepMemory.containerPos.y === y) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}


module.exports = DropContainerHarvester