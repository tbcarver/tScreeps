
var roomTools = require("../../tools/roomTools");
var spawnTools = require("../../tools/spawnTools");
var BaseCreep = require("../baseCreeps/baseCreep");

class DropHarvester extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {

		var acted = super.act();
		var resource;

		if (!acted) {

			if (this.state === "harvesting") {

				if (this.memory.containerId) {
					var container = Game.getObjectById(this.memory.containerId);

					if (!this.creep.pos.isEqualTo(container)) {
						this.travelTo(container, 0, true);
						acted = true;
					}
				}

				if (!acted) {

					if (this.memory.resourceId) {
						resource = Game.getObjectById(this.memory.resourceId);

					} else {
						resource = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
					}

					if (resource) {
						if (this.isInTravelDistance(resource)) {
							this.travelNearTo(resource);
						} else if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {

							var containers = roomTools.getSourcesWritableDropContainers(this.creep.room.name, resource.id);
							if (containers) {

								var path = this.creep.pos.findPathTo(resource, {
									costCallback: function(roomName, costMatrix) {
										for (var container of containers) {
											costMatrix.set(container.pos.x, container.pos.y, 255);
										};
										return undefined;
									},
								});
					
								this.creep.moveByPath(path);
	
							} else {
								this.creep.moveTo(resource);
							}
						}
					} else {

						if (this.memory.resourceId) {
							debug.warning(`${this.type} ${this.creep.name} ${this.creep.room.name} no resource found, resourceId: ${this.memory.resourceId}`);
						}
					}
				}
			}

			acted = true;
		}

		return acted;
	}

	getInitialState() {
		return "harvesting";
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory = /** @type {CreepMemory} */ (undefined);

		if (room.find) {

			var resources = roomTools.getSources(room.name);
			var countDropHarvesters = {};
			var countResourceHarvestPositions = {};

			for (var resource of resources) {
				countDropHarvesters[resource.id] = getCountDropHarvestersAtResource(resource.id);
				countResourceHarvestPositions[resource.id] = roomTools.getCountResourceHarvestPositions(resource.id);
			}

			if (room.name !== spawn.room.name) {
				var exitFlag = Game.flags[`exit-from-${room.name}-to-${spawn.room.name}`];
				if (exitFlag) {
					resources.sort((resourceA, resourceB) => resourceA.pos.getRangeTo(exitFlag) - resourceB.pos.getRangeTo(exitFlag));
				}
			} else {
				resources.sort((resourceA, resourceB) => resourceA.pos.getRangeTo(spawn) - resourceB.pos.getRangeTo(spawn));
			}

			// Evenly distribute creeps
			var found = false;
			for (var count = 1; count <= 10; count++) {
				for (var resource of resources) {
					if (countResourceHarvestPositions[resource.id] >= count) {
						if (countDropHarvesters[resource.id] < count) {

							creepMemory = {
								type: "dropHarvester",
								resourceId: resource.id,
							}

							var containers = roomTools.getSourcesWritableDropContainers(room.name, resource.id);
							containers = containers.filter(container => countDropHarvestersAssignedToContainer(container) < 1);

							if (containers.length > 0) {
								creepMemory.containerId = containers[0].id;
							}

							found = true;
							break;
						};
					}
				}
				if (found) {
					break;
				}
			}
		} else {

			creepMemory = {
				type: "dropHarvester",
			};
		}

		if (creepMemory) {
			creepMemory.bodyPartsType = "moveWork";
			creepMemory.state = "harvesting";
			creepMemory.maximumSpawnCapacity = 500;
		}

		return creepMemory;
	}
}

function getCountDropHarvestersAtResource(resourceId) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory, creepName) => {

		if (creepMemory.type === "dropHarvester" && !spawnTools.isCreepInSpawnBuffer(Game.creeps[creepName])) {

			if (creepMemory.resourceId === resourceId) {
				countCreeps++;
			}
		}

		return countCreeps;
	}, 0);

	return countCreeps;
}

function countDropHarvestersAssignedToContainer(container) {

	var countCreeps = _.reduce(Memory.creeps, (countCreeps, creepMemory, creepName) => {

		if (creepMemory.type === "dropHarvester" && !spawnTools.isCreepInSpawnBuffer(Game.creeps[creepName])) {

			if (creepMemory.containerId === container.id) {
				countCreeps++;
			};
		};

		return countCreeps;
	}, 0);

	return countCreeps;
}


module.exports = DropHarvester