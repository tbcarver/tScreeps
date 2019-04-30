
var creepsSpawnRules = {
	builders: 4,
	containerEnergizers: 4,
	controllerEnergizers: 8,
	defenders: 4,
	extensionEnergizers: 4,
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 0,
			[STRUCTURE_CONTAINER]: 0
		}
	},
	repairers: 3,
	spawnEnergizers: 2,
	wallRepairers: 3
}

var maxExtensionsPerEnergizer = 2;
var maxEnergizersPerContainer = 2;


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.maxExtensionsPerEnergizer = maxExtensionsPerEnergizer;
module.exports.maxEnergizersPerContainer = maxEnergizersPerContainer;