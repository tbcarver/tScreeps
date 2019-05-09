
var CustomCreep = require("../customCreep");
var findTools = require("../../tools/findTools");
var { maxEnergizersPerContainer } = require("../../creepsRules");


function ContainerEnergizer(creep) {

	CustomCreep.call(this, creep);
}

ContainerEnergizer.prototype = Object.create(CustomCreep.prototype);

ContainerEnergizer.prototype.act = function() {

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

				debug.danger("containerEnergizer resource not found: " + this.memory.resourceId);
			}
		}

		if (this.state === "alternateTransferring") {

			var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: container => container.structureType === STRUCTURE_CONTAINER &&
					container.store[RESOURCE_ENERGY] / container.storeCapacity < .80
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

				debug.danger("containerEnergizer container not found: " + this.memory.containerId);
			}
		}

	}
}

ContainerEnergizer.spawn = function(creepsCurrentCount) {

	var creepMemory
	var container;

	// Evenly distribute creeps to each container up to the max creeps per container
	for (var energizersPerContainer = 1; energizersPerContainer <= maxEnergizersPerContainer; energizersPerContainer++) {

		var containers = global.room.find(FIND_STRUCTURES, {
			filter: {
				structureType: STRUCTURE_CONTAINER
			}
		});

		containers = containers.filter(container => {

			var countEnergizers = countContainerEnergizersAtContainerPosition(container.pos.x, container.pos.y);

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
				type: "containerEnergizer",
				resourceId: resource.id,
				containerId: container.id,
				containerPos: container.pos
			};

		} else {

			debug.warning(`containerEnergizer did not spawn no resources found`);
		}
	}

	return creepMemory;
}

function countContainerEnergizersAtContainerPosition(x, y) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory) => {

		if (creepMemory.type === "containerEnergizer") {

			if (creepMemory.containerPos.x === x && creepMemory.containerPos.y === y) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}


module.exports = containerEnergizer