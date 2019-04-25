
var creepsSpawnRules = {
	builders: 4,
	energizers: {
		[STRUCTURE_SPAWN]: 1,
		[STRUCTURE_CONTROLLER]: 6
	},
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_EXTENSION]: 4,
			[STRUCTURE_CONTAINER]: 6
		}
	},
	repairers: 1
}


module.exports.creepsSpawnRules = creepsSpawnRules;