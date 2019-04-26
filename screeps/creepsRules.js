
var creepsSpawnRules = {
	builders: 6,
	energizers: {
		[STRUCTURE_SPAWN]: 1,
		[STRUCTURE_CONTROLLER]: 1
	},
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 5,
			[STRUCTURE_CONTAINER]: 0
		}
	},
	repairers: 1
}


module.exports.creepsSpawnRules = creepsSpawnRules;