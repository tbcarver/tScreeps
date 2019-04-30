
var creepsSpawnRules = {
	builders: 4,
	controllerEnergizers: 0,
	defenders: 4,
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 4,
			[STRUCTURE_CONTAINER]: 10
		}
	},
	repairers: 4,
	spawnEnergizers: 2,
	wallRepairers: 2
}

var harvesterRules = {
	maxExtensionsPerCreep: 2,
	maxCreepsPerContainer: 3
}


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.harvesterRules = harvesterRules;