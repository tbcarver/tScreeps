// TODO: error handling for bad creep type

var creepsSpawnRules = [
	{
		roomName: "W7N8",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ dropHarvester: 0 },
			{ extensionEnergizer: 3 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 0 },
			{ controllerEnergizer: 1 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 3,
		maxEnergizersPerContainer: 3,
		canEnergyCreepsHarvest: false,
		canEnergyCreepsPickup: false,
		canControllerEnergizersBuild: false,
		remoteRooms: [
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ remoteReserver: 1 },
					{ remoteBuilder: 4 },
					{ builder: 2 },
					{ dropContainerHarvester: 3 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: false,
			},
			{
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 1 },
					{ builder: 2 },
					{ remoteSpawnedPickupEnergizer: 2 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: true,
			},
		]
	},
];


module.exports = creepsSpawnRules;