
var debug = require("../debug");
var spawnTools = {};

spawnTools.calculateSpawnCapacity = function() {

	var extensions = global.room.find(FIND_MY_STRUCTURES, {
		filter: { structureType: STRUCTURE_EXTENSION }
	});

	var availableExtensionEnergy = extensions.reduce((total, extension) => total + (extension.energy), 0);

	return global.spawn.energyCapacity + availableExtensionEnergy;
}

module.exports = spawnTools;