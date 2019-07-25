
var { rules } = require("../rules/rules");
var flagTools = require("./flagTools");
var roomTools = require("./roomTools");
var findTools = {};

// NOTE: Order is important.
findTools.findAllEnergyStructures = function(spawn) {

	var energyStructures = spawn.room.find(FIND_MY_STRUCTURES, {
		filter: { structureType: STRUCTURE_EXTENSION }
	});

	energyStructures = _.shuffle(energyStructures);

	var spawns = spawn.room.find(FIND_MY_SPAWNS);

	for (var spawn of spawns) {
		energyStructures.push(spawn);
	}

	return energyStructures;
}

// NOTE: Order is important.
findTools.findClosestWritableDroppedOrStoredEnergy = function(pos, minimum) {

	if (!minimum) {
		minimum = 100;
	}

	var droppedResources = roomTools.GetSourcesWritableDroppedResources(pos.roomName);

	if (flagTools.getDropFlag(pos.roomName)) {
		droppedResources = roomTools.GetDropFlagWritableDroppedResources(pos.roomName);
	}

	var energy = pos.findClosestByRange(droppedResources, {
		filter: resource => resource.amount >= minimum && this.isInRange(pos, resource.pos, 10)
	});

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum && this.isInRange(pos, structure.pos, 10)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(droppedResources, {
			filter: resource => resource.amount >= minimum && this.isInRange(pos, resource.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum && this.isInRange(pos, structure.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(droppedResources, {
			filter: resource => resource.amount >= minimum * 2
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] >= minimum * 2
		});
	}

	return energy;
}

// NOTE: Order is important.
findTools.findClosestStoredEnergy = function(pos, minimum) {

	if (!minimum) {
		minimum = 100;
	}

	var energy = pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
			structure.structureType === STRUCTURE_TERMINAL ||
			structure.structureType === STRUCTURE_CONTAINER) &&
			structure.store[RESOURCE_ENERGY] > minimum && this.isInRange(pos, structure.pos, 10)
	});

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum && this.isInRange(pos, structure.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum * minimum
		});
	}

	return energy;
}

// NOTE: Order is important.
findTools.findClosestEnergy = function(pos, minimum) {

	if (!minimum) {
		minimum = 100;
	}

	var droppedResources = roomTools.GetWritableDroppedResources(pos.roomName);

	var energy = pos.findClosestByPath(droppedResources, {
		filter: resource => resource.amount >= minimum && this.isInRange(pos, resource.pos, 10)
	});

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum && this.isInRange(pos, structure.pos, 10)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(droppedResources, {
			filter: resource => resource.amount >= minimum && this.isInRange(pos, resource.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum && this.isInRange(pos, structure.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
			filter: resource => this.isInRange(pos, resource.pos, 20) && resource.amount / resource.amountCapacity > .10
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(droppedResources, {
			filter: resource => resource.amount >= minimum * minimum
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum * minimum
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
			filter: resource => resource.amount / resource.amountCapacity > .10
		});
	}

	return energy;
}

findTools.findSourcesWritableDroppedResource = function(pos, minimum) {

	if (!minimum) {
		minimum = 100;
	}

	var resources;
	var resource;
	var droppedResources = roomTools.GetSourcesWritableDroppedResources(pos.roomName);

	resources = pos.findInRange(droppedResources, 3, {
		filter: resource => resource.writableAmount >= minimum
	});

	if (resources.length > 0) {
		resource = pos.findClosestByPath(resources);
	}

	if (!resource) {
		resources = pos.findInRange(droppedResources, 3, {
			filter: resource => resource.writableAmount >= minimum / 4
		});

		if (resources.length > 0) {
			resource = pos.findClosestByPath(resources);
		}
	}

	if (!resource) {
		var sources = roomTools.getSources(pos.roomName);
		var source = pos.findClosestByRange(sources);
		droppedResources = roomTools.GetSourceWritableDroppedResources(pos.roomName, source.id);

		resource = pos.findClosestByPath(droppedResources, {
			filter: resource => resource.writableAmount >= minimum * 2
		});

		if (!resource) {

			var droppedResources = roomTools.GetSourcesWritableDroppedResources(pos.roomName);

			resource = pos.findClosestByPath(droppedResources, {
				filter: resource => resource.writableAmount >= minimum / 2
			});
		}
	}

	if (!resource) {
		var resources = pos.findInRange(droppedResources, 1);

		if (resources.length > 0) {
			resource = pos.findClosestByPath(resources);
		}
	}

	return resource;
}

findTools.isInRange = function(sourcePos, targetPos, range) {

	var result = PathFinder.search(sourcePos, { pos: targetPos, range: range });

	return result.cost === 0;
}

findTools.findRoute = function(fromRoom, toRoom) {

	var route = Game.map.findRoute(fromRoom, toRoom, {
		routeCallback(roomName, fromRoomName) {

			if (rules.routeIgnoreRooms.includes(roomName)) {
				return Infinity;
			} else if (Object.keys(rules.routeRoomsPriority).includes(roomName)) {
				return rules.routeRoomsPriority[roomName];
			}

			return 1;
		}
	});

	return route;
}


module.exports = findTools;