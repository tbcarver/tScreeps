
var creepsSpawnRules = {
	builders: 4,
	energizers: {
		[STRUCTURE_SPAWN]: 1,
		[STRUCTURE_CONTROLLER]: 6
	},
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 1,
			[STRUCTURE_CONTAINER]: 0
		}
	},
	repairers: 1
}


module.exports.creepsSpawnRules = creepsSpawnRules;