
var CustomCreep = require("../customCreep");
var roomTools = require("../../tools/roomTools");
var { maxEnergizersPerContainer } = require("../../creepsRules");

function ContainerHarvester(creep) {

	CustomCreep.call(this, creep);
}

ContainerHarvester.prototype = Object.create(CustomCreep.prototype);

ContainerHarvester.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {

				this.state = "harvesting";
			}

			resource = Game.getObjectById(this.memory.resourceId);

			if (resource) {

				if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {

					this.creep.moveTo(resource);
				}

			} else {

				debug.danger("containerHarvester resource not found: " + this.memory.resourceId);
			}
		}

		if (this.state === "alternateTransferring") {

			var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: container => container.structureType === STRUCTURE_CONTAINER &&
					container.store[RESOURCE_ENERGY] / container.storeCapacity < .80 &&
					!roomTools.isDropContainer(structure)
			});

			if (this.creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				this.creep.moveTo(container);
			}

		} else if (this.state === "transferring" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			if (this.state !== "transferring") {

				this.state = "transferring";
			}

			var container = Game.getObjectById(this.memory.containerId);

			if (container) {

				var transferResult = this.creep.transfer(container, RESOURCE_ENERGY);

				if (transferResult == ERR_NOT_IN_RANGE) {

					this.creep.moveTo(container);

				} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {


					this.state = "harvesting";

				} else if (transferResult == ERR_FULL) {

					this.state = "alternateTransferring";
				}
			} else {

				debug.danger("containerHarvester container not found: " + this.memory.containerId);
			}
		}

	}
}

ContainerHarvester.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory
	var container;

	// Evenly distribute creeps to each container up to the max creeps per container
	for (var energizersPerContainer = 1; energizersPerContainer <= maxEnergizersPerContainer; energizersPerContainer++) {

		var containers = room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
				!roomTools.isDropContainer(structure)
		});

		containers = containers.filter(container => {

			var countEnergizers = countContainerHarvestersAtContainerPosition(container.pos.x, container.pos.y);

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
				type: "containerHarvester",
				resourceId: resource.id,
				containerId: container.id,
				containerPos: container.pos
			};

		} else {

			debug.warning(`containerHarvester did not spawn no resources found`);
		}
	}

	return creepMemory;
}

function countContainerHarvestersAtContainerPosition(x, y) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory) => {

		if (creepMemory.type === "containerHarvester") {

			if (creepMemory.containerPos.x === x && creepMemory.containerPos.y === y) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}


module.exports = ContainerHarvester