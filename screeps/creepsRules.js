
var creepsSpawnRules = {
	builders: 3,
	energizers: {
		[STRUCTURE_SPAWN]: 2,
		[STRUCTURE_CONTROLLER]: 1
	},
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 3,
			[STRUCTURE_CONTAINER]: 2
		}
	},
	repairers: 2
}


module.exports.creepsSpawnRules = creepsSpawnRules;