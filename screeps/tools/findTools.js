
var { rules } = require("../rules/rules");
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
findTools.findClosestDroppedOrStoredEnergy = function(pos, minimum) {

	if (!minimum) {
		minimum = 100;
	}

	var energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
		filter: resource => resource.energy && resource.energy >= minimum && this.isInRange(pos, resource.pos, 10)
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

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= minimum && this.isInRange(pos, resource.pos, 20)
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

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= minimum + 100
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] >= minimum + 100
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
				structure.store[RESOURCE_ENERGY] > minimum + 100
		});
	}

	return energy;
}

// NOTE: Order is important.
findTools.findClosestEnergy = function(pos, minimum) {

	if (!minimum) {
		minimum = 100;
	}

	var energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
		filter: resource => resource.energy && resource.energy >= minimum && this.isInRange(pos, resource.pos, 10)
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

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= minimum && this.isInRange(pos, resource.pos, 20)
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
			filter: resource => this.isInRange(pos, resource.pos, 20) && resource.energy / resource.energyCapacity > .10
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy && resource.energy >= minimum + 100
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL ||
				structure.structureType === STRUCTURE_CONTAINER) &&
				structure.store[RESOURCE_ENERGY] > minimum + 100
		});
	}

	if (!energy) {

		energy = pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
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