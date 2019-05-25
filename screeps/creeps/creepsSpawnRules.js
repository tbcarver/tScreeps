
var creepSpawnRules = [
	{
		roomName: "W6S0",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 8 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 8 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 2 },
			{ controllerEnergizer: 6 },
			{ wallRepairer: 1 },
		],
		maxExtensionsPerEnergizer: 3,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		remoteRooms: [
			{
				roomName: "W6S1",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
			{
				roomName: "W6N0",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ remoteBuilder: 8 },
					{ dropContainerHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
					{ remoteSpawnedHarvester: 0 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
			{
				roomName: "W7S0",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 4 },
					{ dropContainerHarvester: 4 },
					{ storageEnergizer: 2 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
		]
	},
	{
		roomName: "W6S1",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 3 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 2 },
			{ controllerEnergizer: 1 },
		],
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: true,
		remoteRooms: []
	},
	{
		roomName: "W7S0",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ builder: 4 },
			{ controllerEnergizer: 4 },
		],
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: true,
		remoteRooms: []
	},
];


module.exports = creepSpawnRules;