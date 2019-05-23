
var creepSpawnRules = [
	{
		roomName: "W6S0",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ builder: 4 },
			{ spawnEnergizer: 2 },
			{ extensionEnergizer: 5 },
			{ dropContainerHarvester: 4 },
			{ extensionEnergizer: 5 },
			{ storageEnergizer: 2 },
			{ containerHarvester: 2 },
			{ controllerEnergizer: 0 },
			{ wallRepairer: 0 },
		],
		maxExtensionsPerEnergizer: 3,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		remoteRooms: [
			{
				roomName: "W6S1",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ builder: 4 },
					{ dropContainerHarvester: 4 },
					{ remoteStorageEnergizer: 4 },
					{ storageEnergizer: 2 },
					{ controllerEnergizer: 1 },
					{ spawnEnergizer: 1 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: true,
			}
		]
	},
];


module.exports = creepSpawnRules;