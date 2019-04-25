
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

	var energy = pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (structure) => structure.structureType == STRUCTURE_CONTAINER &&
			structure.store[RESOURCE_ENERGY] > 35
	});

	if (!energy) {

		energy = pos.findClosestByPath(FIND_SOURCES);
	}

	return energy;
}


module.exports = findTools;