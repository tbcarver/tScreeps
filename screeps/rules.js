// TODO: error handling for bad creep type

var rules = {
	maximumRangedDefenderSpawnCapacity: 800,
}

var creepsSpawnRules = [
	{
		roomName: "W7N8",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ builder: 6 },
			{ spawnEnergizer: 1 },
			{ dropHarvester: 0 },
			{ extensionEnergizer: 6 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 1 },
			{ controllerEnergizer: 2 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 3,
		canEnergizersTransferToDropContainers: false,
		canEnergyCreepsHarvest: false,
		canEnergyCreepsPickup: false,
		canControllerEnergizersBuild: true,
		remoteRooms: [
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 0 },
					{ rangedDefender: 2 },
					{ remoteBuilder: 0 },
					{ builder: 0 },
					{ dropContainerHarvester: 4 },
					{ remoteStorageEnergizer: 4 },
					{ storageEnergizer: 1 },
					{ controllerEnergizer: 0 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: false,
			},
			{
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ rangedDefender: 2 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ builder: 2 },
					{ remoteBuilder: 2 },
					{ remoteSpawnedPickupEnergizer: 3 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: true,
			},
			{
				roomName: "W7N7",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ remoteReserver: 1 },
					{ builder: 2 },
					{ dropHarvester: 2 },
					{ remoteSpawnedPickupEnergizer: 4 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: true,
			},
			{
				roomName: "W6N8",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ remoteBuilder: 4 },
					{ builder: 2 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ remoteSpawnedPickupEnergizer: 3 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: true,
			},
		]
	},
	{
		roomName: "W7N9",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ spawnEnergizer: 2 },
			{ extensionEnergizer: 3 },
			{ builder: 12 },
			{ controllerEnergizer: 12 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 3,
		maxEnergizersPerContainer: 3,
		minDefendersWaiting: 2,
		canEnergyCreepsHarvest: true,
		canEnergyCreepsPickup: false,
		canControllerEnergizersBuild: true,
	},
];

// var creepsSpawnRules = [
// 	{
// 		roomName: "E1N12",
// 		spawnOrderMaxSpawnedCounts: [
// 			{ dropHarvester: 2 },
// 			{ controllerEnergizer: 4 },
// 		],
// 		waitForMinimumSpawnCapacity: false,
// 		maxExtensionsPerEnergizer: 4,
// 		maxEnergizersPerContainer: 3,
// 		canEnergizersTransferToDropContainers: false,
// 		canEnergyCreepsHarvest: false,
// 		canEnergyCreepsPickup: true,
// 		canControllerEnergizersBuild: true,
// 		remoteRooms: [
// 		]
// 	},
// ];

var roomNamesCreepsSpawnRules = _.cloneDeep(creepsSpawnRules);

for (creepsSpawnRule of roomNamesCreepsSpawnRules) {

	roomNamesCreepsSpawnRules[creepsSpawnRule.roomName] = creepsSpawnRule;

	if (creepsSpawnRule.remoteRooms) {
		var remoteRooms = {};

		for (remoteCreepsSpawnRule of creepsSpawnRule.remoteRooms) {
			remoteRooms[remoteCreepsSpawnRule.roomName] = remoteCreepsSpawnRule;
		}

		creepsSpawnRule.remoteRooms = remoteRooms;
	}
}

module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.roomNamesCreepsSpawnRules = roomNamesCreepsSpawnRules;