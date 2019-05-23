
var creepSpawnRules = [
	{
		roomName: "W6S0",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 5 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 2 },
			{ controllerEnergizer: 1 },
		],
		maxExtensionsPerEnergizer: 3,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		remoteRooms: [
			{
				roomName: "W6S1",
				spawnOrderMaxSpawnedCounts: [
					{ dropContainerHarvester: 4 },
					{ storageEnergizer: 1 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			}
		]
	},
	{
		roomName: "W6S1",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ storageEnergizer: 1 },
			{ controllerEnergizer: 4 },
		],
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: true,
		remoteRooms: []
	},
];


module.exports = creepSpawnRules;