
var { rules } = require("../rules/rules");
var findTools = {};

// NOTE: Order is important.
findTools.findAllEnergyStructures = function(spawn) {

	var energyStructures = spawn.room.find(FIND_MY_STRUCTURES, {
		filter: { structureType: STRUCTURE_EXTENSION }
	});

	var spawns = spawn.room.find(FIND_MY_SPAWNS);

	for (var spawn of spawns) {
		energyStructures.push(spawn);
	}

	return energyStructures;
}

// NOTE: Order is important.
findTools.findClosestDroppedOrStoredEnergy = function(pos) {

	var energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
		filter: resource => resource.energy && resource.energy >= 100 && this.isInRange(pos, resource.pos, 10)
	});

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 100 && this.isInRange(pos, structure.pos, 10)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= 100 && this.isInRange(pos, resource.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 100 && this.isInRange(pos, structure.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= 200
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 200
		});
	}

	return energy;
}

// NOTE: Order is important.
findTools.findClosestStoredEnergy = function(pos) {

	var energy = pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
			structure.structureType === STRUCTURE_STORAGE) &&
			structure.store[RESOURCE_ENERGY] > 100 && this.isInRange(pos, structure.pos, 10)
	});

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 100 && this.isInRange(pos, structure.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 200
		});
	}

	return energy;
}

// NOTE: Order is important.
findTools.findClosestEnergy = function(pos) {

	var energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
		filter: resource => resource.energy && resource.energy >= 100 && this.isInRange(pos, resource.pos, 10)
	});

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 100 && this.isInRange(pos, structure.pos, 10)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_SOURCES, {
			filter: resource => this.isInRange(pos, resource.pos, 10) && resource.energy / resource.energyCapacity > .10
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= 100 && this.isInRange(pos, resource.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 100 && this.isInRange(pos, structure.pos, 20)
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_SOURCES, {
			filter: resource => this.isInRange(pos, resource.pos, 20) && resource.energy / resource.energyCapacity > .10
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= 200
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_CONTAINER ||
				structure.structureType === STRUCTURE_STORAGE) &&
				structure.store[RESOURCE_ENERGY] > 200
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_SOURCES, {
			filter: resource => resource.energy / resource.energyCapacity > .10
		});
	}

	return energy;
}

findTools.isInRange = function(sourcePos, targetPos, range) {

	var result = PathFinder.search(sourcePos, { pos: targetPos, range: range });

	return result.cost === 0;
}

findTools.findRoute = function(fromRoom, toRoom) {

	var route = Game.map.findRoute(fromRoom, toRoom, {
		routeCallback(roomName, fromRoomName) {

			if (rules.routeAvoidRooms.includes(roomName)) {
				// Avoid this room
				return 2;
			}

			return 1;
		}
	});

	return route;
}


module.exports = findTools;