
var CustomCreep = require("../customCreep");
var roomTools = require("../../tools/roomTools");
var { maxEnergizersPerContainer } = require("../../creepsRules");

function DropContainerHarvester(creep) {

	CustomCreep.call(this, creep);
}

DropContainerHarvester.prototype = Object.create(CustomCreep.prototype);

DropContainerHarvester.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		if (this.state === "harvesting") {

			var resource = Game.getObjectById(this.memory.resourceId);
			var container = Game.getObjectById(this.memory.containerId);

			if (resource && container) {

				if (container.store.energy < container.storeCapacity) {

					var result = this.creep.harvest(resource);

					if (result !== OK) {
	
						debug.danger("dropContainerHarvester harvest failed:", result);
					}
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

DropContainerHarvester.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory
	var container;

	// Evenly distribute creeps to each container up to the max creeps per container
	for (var energizersPerContainer = 1; energizersPerContainer <= maxEnergizersPerContainer; energizersPerContainer++) {

		var containers = room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
				roomTools.isDropContainer(structure)
		});

		containers = containers.filter(container => {

			var countEnergizers = countDropContainerHarvestersAtContainerPosition(container.pos.x, container.pos.y);

			return countEnergizers < energizersPerContainer;
		});

		if (containers.length > 0) {

			container = containers[0];

			break;
		}
	}

	if (container) {

		var resource = container.pos.findClosestByRange(FIND_SOURCES);

		if (resource) {

			creepMemory = {
				type: "dropContainerHarvester",
				bodyPartsType: "workDropper",
				state: "moving",
				resourceId: resource.id,
				containerId: container.id,
				containerPos: container.pos
			};

		} else {

			debug.warning(`dropContainerHarvester did not spawn no resources found`);
		}
	}

	return creepMemory;
}

function countDropContainerHarvestersAtContainerPosition(x, y) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory) => {

		if (creepMemory.type === "dropContainerHarvester") {

			if (creepMemory.containerPos.x === x && creepMemory.containerPos.y === y) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}


module.exports = DropContainerHarvester