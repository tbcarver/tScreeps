
var creepsSpawnRules = {
	builders: 4,
	harvesters: {
		[RESOURCE_ENERGY]: {
			[STRUCTURE_SPAWN]: 1,
			[STRUCTURE_EXTENSION]: 4,
			[STRUCTURE_CONTROLLER]: 6
		}
	},
	repairers: 1
}


module.exports.creepsSpawnRules = creepsSpawnRules;