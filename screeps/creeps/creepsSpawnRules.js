
var creepsSpawnRules = [
	{
		roomName: "W0S2",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ builder: 6 },
			{ spawnEnergizer: 3 },
			{ dropContainerHarvester: 4 },
			{ controllerEnergizer: 2 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: true,
		remoteRooms: []
	},
];


module.exports = creepsSpawnRules;