// TODO: error handling for bad creep type

var creepsSpawnRules = [
	{
		roomName: "W7N8",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ dropHarvester: 7 },
			{ extensionEnergizer: 2 },
			{ dropContainerHarvester: 0 },
			{ storageEnergizer: 0 },
			{ controllerEnergizer: 4 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 3,
		canEnergyCreepsHarvest: false,
		canControllerEnergizersBuild: true,
		remoteRooms: [

			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSpawnedHarvester: 4 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergyCreepsHarvest: true,
			},
		]
	},
];


module.exports = creepsSpawnRules;