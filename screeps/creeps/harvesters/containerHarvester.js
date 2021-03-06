
var roomTools = require("../../tools/roomTools");
var spawnTools = require("../../tools/spawnTools");
var BaseCreep = require("../baseCreeps/baseCreep");

class ContainerHarvester extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {

		if (!super.act()) {

			var container;

			if (this.state === "arrivedAtRemoteRoom") {
				this.state = "harvesting";
			}

			if (this.state === "harvesting" || this.creep.carry.energy === 0) {

				if (this.state !== "harvesting") {

					this.state = "harvesting";
				}

				var resource = this.creep.pos.findClosestByPath(FIND_SOURCES);

				if (resource) {

					var result = this.creep.harvest(resource);

					if (result === ERR_NOT_IN_RANGE) {

						this.creep.moveTo(resource);

					} else if (result === ERR_NOT_ENOUGH_RESOURCES) {
						this.state = "transferring";
					}

				} else {
					debug.danger(`${this.type} ${this.creep.name} ${this.roomName} no resource found, resourceId: ${this.memory.resourceId}`);
				}
			}

			if (this.state === "alternateTransferring") {

				container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: container => (container.structureType === STRUCTURE_CONTAINER ||
						container.structureType === STRUCTURE_STORAGE) &&
						container.store[RESOURCE_ENERGY] / container.storeCapacity < .80 &&
						!roomTools.isDropContainer(container)
				});

				if (this.creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

					this.creep.moveTo(container);
				}

			} else if (this.state === "transferring" || this.creep.carry.energy === this.creep.carryCapacity) {

				if (this.state !== "transferring") {

					this.state = "transferring";
				}

				container = Game.getObjectById(this.memory.containerId);

				if (container) {

					var transferResult = this.creep.transfer(container, RESOURCE_ENERGY);

					if (transferResult == ERR_NOT_IN_RANGE) {

						this.creep.moveTo(container);

					} else if (transferResult == ERR_FULL && this.creep.carry.energy / this.creep.carryCapacity < .33) {


						this.state = "harvesting";

					} else if (transferResult == ERR_FULL) {

						this.state = "alternateTransferring";
					}
				} else {

					debug.danger("containerHarvester container not found: " + this.memory.containerId);
				}
			}

		}

		return true;
	}

	getInitialState() {
		return "harvesting";
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		// TODO: Remove the harvest energy source finding and let it find an available energy source

		var creepMemory
		var container;

		if (!creepsSpawnRule.maxEnergizersPerContainer) {
			debug.warning(`maxEnergizersPerContainer not defined using 10`);
			creepsSpawnRule.maxEnergizersPerContainer = 10;
		}

		// Evenly distribute creeps to each container up to the max creeps per container
		for (var energizersPerContainer = 1; energizersPerContainer <= creepsSpawnRule.maxEnergizersPerContainer; energizersPerContainer++) {

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
					bodyPartsType: "moveCarryWork",
					maximumSpawnCapacity: 550,
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
}

function countContainerHarvestersAtContainerPosition(x, y) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory, creepName) => {

		if (creepMemory.type === "containerHarvester" && !spawnTools.isCreepInSpawnBuffer(Game.creeps[creepName])) {

			if (creepMemory.containerPos.x === x && creepMemory.containerPos.y === y) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}


module.exports = ContainerHarvester