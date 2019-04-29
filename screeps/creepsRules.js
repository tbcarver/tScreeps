
var creepsSpawnRules = {
	builders: 4,
	defenders: 4,
	energizers: {
		[STRUCTURE_SPAWN]: 2,
		[STRUCTURE_CONTROLLER]: 8
	},
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 4,
			[STRUCTURE_CONTAINER]: 10
		}
	},
	repairers: 4,
	wallsRepairer: 2
}

var harvesterRules = {
	maxExtensionsPerCreep: 2,
	maxCreepsPerContainer: 3
}


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.harvesterRules = harvesterRules;