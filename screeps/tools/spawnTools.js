
var debug = require("../debug");
var spawnTools = {};

spawnTools.calculateSpawnCapacity = function() {

	var spawnCapacity = global.room.energyAvailable;

	// Check if energy is still accumulating
	if (Memory.state.lastRoomEnergyAvailable != global.room.energyAvailable) {

		var extensions = global.room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_EXTENSION }
		});

		var availableExtensionEnergy = extensions.reduce((total, extension) => total + (extension.energy), 0);

		spawnCapacity = global.spawn.energyCapacity + availableExtensionEnergy;
	}

	return spawnCapacity;
}

spawnTools.calculateBodyCost = function(bodyParts) {

	var cost = bodyParts.reduce(function(cost, part) {
		return cost + BODYPART_COST[part];
	}, 0);

	return cost;
}

module.exports = spawnTools;