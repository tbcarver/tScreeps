
var creepsSpawnRules = [
	{
		roomName: "W6S0",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 8 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 8 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 2 },
			{ controllerEnergizer: 2 },
			{ wallRepairer: 1 },
		],
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		temp:false,
		remoteRooms: [
			{
				roomName: "W6S2",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 4 },
					{ rangedDefender: 2 },
				],
			},
			{
				roomName: "W7S1",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 2 },
				],
			},
			{
				roomName: "W7S2",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 4 },
					{ rangedDefender: 2 },
				],
			},
			{
				roomName: "W6N0",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 2 },
					{ builder: 2 },
					{ dropContainerHarvester: 2 },
					{ containerHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
			{
				roomName: "W6S1",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 2 },
					{ remoteSpawnedStorageEnergizer: 0 },
					{ controllerEnergizer: 0 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			},
			{
				roomName: "W7S0",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 4 },
					{ storageEnergizer: 6 },
					{ controllerEnergizer: 6 },
					{ remoteStorageEnergizer: 0 },
					{ remoteSpawnedStorageEnergizer: 2 },
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
			{ extensionEnergizer: 4 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 4 },
			{ controllerEnergizer: 2 },
		],
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		remoteRooms: [
			{
				roomName: "W7S1",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ remoteReserver: 1 },
					{ builder: 4 },
					{ rangedDefender: 4 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
				minDefendersWaiting: 1,
			},
			{
				roomName: "W6S2",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 0 },
					{ remoteBuilder: 5 },
					{ builder: 2 },
					{ dropContainerHarvester: 4 },
					{ storageEnergizer: 2 },
					{ remoteSpawnedStorageEnergizer: 0 },
					{ remoteStorageEnergizer: 0 },
					{ controllerEnergizer: 2 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
				minDefendersWaiting: 1,
			},
			{
				roomName: "W7S2",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 4 },
					{ remoteClaimer: 1},
					{ rangedDefender: 4 },
				],
				minDefendersWaiting: 2,
			},
		]
	},
	{
		roomName: "W7S0",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 4 },
			{ dropContainerHarvester: 4 },
			{ controllerEnergizer: 6 },
		],
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		remoteRooms: [
			{
				roomName: "W6N0",
				spawnOrderMaxSpawnedCounts: [
					{ remoteReserver: 2 },
				],
			},
			{
				roomName: "W7S1",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSitter: 1 },
					{ remoteReserver: 1 },
					{ rangedDefender: 5 },
					{ repairer: 2 },
					{ builder: 4 },
					{ remoteBuilder: 0 },
					{ dropContainerHarvester: 4 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
				minDefendersWaiting: 1,
			},
		]
	},
	{
		roomName: "W6S2",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 3 },
			{ storageEnergizer: 0 },
			{ controllerEnergizer: 0 },
		],
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: true,
		minDefendersWaiting: 1,
		remoteRooms: [
			{
				roomName: "W7S2",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSitter: 1 },
					{ remoteReserver: 0 },
					{ repairer: 2 },
					{ builder: 0 },
					{ remoteBuilder: 4 },
					{ spawnEnergizer: 0 },
					{ extensionEnergizer: 0 },
					{ storageEnergizer: 0 },
					{ controllerEnergizer: 0 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
				minDefendersWaiting: 1,
			},
		],
	},
];


module.exports = creepsSpawnRules;