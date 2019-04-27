
var creepsSpawnRules = {
	builders: 4,
	energizers: {
		[STRUCTURE_SPAWN]: 2,
		[STRUCTURE_CONTROLLER]: 9
	},
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 4,
			[STRUCTURE_CONTAINER]: 6
		}
	},
	repairers: 2,
	wallsRepairer: 1
}

var harvesterRules = {
	maxExtensionsPerCreep: 2,
	maxCreepsPerContainer: 2
}


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.harvesterRules = harvesterRules;