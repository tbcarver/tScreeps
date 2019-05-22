
var creepSpawnRules = [
	{
		roomName: "W610",
		orderMaxSpawnedCounts =[
			{ builder: 4 },
			{ containerHarvester: 2 },
			{ controllerEnergizer: 6 },
			{ dropContainerHarvester: 4 },
			{ extensionEnergizer: 5 },
			{ repairer: 2 },
			{ spawnEnergizer: 1 },
			{ storageEnergizer: 2 },
			{ wallRepairer: 1 },
		],
		maxExtensionsPerEnergizer: 3,
		maxEnergizersPerContainer: 3,
		canEnergizersHarvest: false,
		remoteRooms: [
			{
				roomName: "W610",
				orderMaxSpawnedCounts =[
					{ builder: 4 },
					{ containerHarvester: 2 },
					{ controllerEnergizer: 6 },
					{ defender: 0 },
					{ dropContainerHarvester: 4 },
					{ extensionEnergizer: 5 },
					{ remoteHarvester: 0 },
					{ remoteStorageEnergizer: 4 },
					{ repairer: 2 },
					{ spawnEnergizer: 1 },
					{ storageEnergizer: 2 },
				],
				maxExtensionsPerEnergizer: 3,
				maxEnergizersPerContainer: 3,
				canEnergizersHarvest: false,
			}
		]
	},
];


module.exports = creepSpawnRules;