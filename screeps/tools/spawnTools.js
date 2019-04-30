
var debug = require("../debug");
var spawnTools = {};

spawnTools.calculateSpawnCapacity = function() {

	var spawnCapacity = global.room.energyAvailable;

	// Check for not maxed out 300 energy capacity
	if (!(global.spawn.energy < 300 && global.room.energyAvailable < 350 &&
		Memory.state.lastSpawnEnergy < global.spawn.energy)) {

		var extensions = global.room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_EXTENSION }
		});
	
		var availableExtensionEnergy = extensions.reduce((total, extension) => total + (extension.energy), 0);
	
		spawnCapacity = global.spawn.energyCapacity + availableExtensionEnergy;
	}

	return spawnCapacity;
}

module.exports = spawnTools;