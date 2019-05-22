
var creepSpawnRules = [
	{
		roomName: "W1N12",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ builder: 4 },
			{ spawnEnergizer: 1 },
			{ controllerEnergizer: 1 },
		],
		maxExtensionsPerEnergizer: 2,
		maxEnergizersPerContainer: 2,
		canEnergizersHarvest: true,
		remoteRooms: [{
			roomName: "W0N12",
			spawnOrderMaxSpawnedCounts: [
				{ remoteHarvester: 3 },
			],
			maxExtensionsPerEnergizer: 2,
			maxEnergizersPerContainer: 2,
			canEnergizersHarvest: true,
		}]
	},
];


module.exports = creepSpawnRules;