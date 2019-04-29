
var creepsSpawnRules = {
	builders: 2,
	defenders: 4,
	energizers: {
		[STRUCTURE_SPAWN]: 2,
		[STRUCTURE_CONTROLLER]: 6
	},
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 4,
			[STRUCTURE_CONTAINER]: 8
		}
	},
	repairers: 2,
	wallsRepairer: 2
}

var harvesterRules = {
	maxExtensionsPerCreep: 2,
	maxCreepsPerContainer: 2
}


module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.harvesterRules = harvesterRules;