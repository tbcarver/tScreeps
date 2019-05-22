
var creepSpawnRules = [
	{
		roomName: "W1N12",
		spawnOrderMaxSpawnedCounts: [
			{ builder: 0 },
			{ spawnEnergizer: 1 },
		],
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 2,
		canEnergizersHarvest: true,
		remoteRooms: []
	},
];


module.exports = creepSpawnRules;