
var debug = require("../debug");
var findTools = {};

// NOTE: Order is important.
findTools.findAllEnergyStructures = function() {

	var energyStructures = global.room.find(FIND_MY_STRUCTURES, {
		filter: {
			structureType: STRUCTURE_EXTENSION
		}
	});

	energyStructures.push(global.spawn);

	return energyStructures;
}

// NOTE: Order is important.
findTools.findClosestEnergy = function(pos) {

	var findRange = 10;

	var energy = pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
			structure.store[RESOURCE_ENERGY] > 200 && this.isInRange(pos, structure.pos, findRange)
	});

	if (!energy) {

		energy = pos.findClosestByRange(FIND_SOURCES, {
			filter: resource => this.isInRange(pos, resource.pos, findRange)
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
				structure.store[RESOURCE_ENERGY] > 200
		});
	}

	if (!energy) {

		energy = pos.findClosestByRange(FIND_SOURCES);
	}

	return energy;
}

findTools.isInRange = function(sourcePos, targetPos, range) {

	var result = PathFinder.search(sourcePos, { pos: targetPos, range: range });

	return result.cost === 0;
}


module.exports = findTools;