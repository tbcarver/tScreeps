
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
				roomName: "W7S1",
				spawnOrderMaxSpawnedCounts: [
					{ remoteReserver: 1 },
					{ builder: 4 },
				],
			},
			{
				roomName: "W6S2",
				spawnOrderMaxSpawnedCounts: [
					{ remoteReserver: 1 },
					{ builder: 4 },
				],
			},
			{
				roomName: "W6N0",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ builder: 2 },
					{ dropContainerHarvester: 2 },
					{ containerHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
					{ wallRepairer: 2 },
					{ controllerEnergizer: 1 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
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
				roomName: "W7S0",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 4 },
					{ remoteStorageEnergizer: 4 },
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
		remoteRooms: [
			{
				roomName: "W7S1",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 4 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
			{
				roomName: "W6S2",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSitter: 1 },
					{ repairer: 0 },
					{ builder: 4 },
					{ remoteBuilder: 4 },
					{ dropContainerHarvester: 4 },
					{ remoteSpawnedStorageEnergizer: 0 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
		]
	},
	{
		roomName: "W7S0",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 4 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 2 },
			{ controllerEnergizer: 2 },
		],
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		remoteRooms: [
			{
				roomName: "W7S1",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSitter: 1 },
					{ repairer: 1 },
					{ builder: 4 },
					{ remoteBuilder: 0 },
					{ dropContainerHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 0 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
		]
	},
];


module.exports = creepSpawnRules;