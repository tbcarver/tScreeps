// TODO: error handling for bad creep type

var rules = {
	maximumRangedDefenderSpawnCapacity: 800,
}


var creepsSpawnRules = [
	{
		roomName: "W7N8",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 6 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 1 },
			{ builder: 6 },
			{ controllerEnergizer: 1 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 3,
		canEnergizersTransferToDropContainers: false,
		canEnergyCreepsHarvest: false,
		canEnergyCreepsPickup: true,
		canControllerEnergizersBuild: true,
		remoteRooms: [
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 4 },
				],
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canControllerEnergizersBuild: true,
			},
			{
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 1 },
					{ storageEnergizer: 1 },
					{ builder: 4 },
				],
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				partsPerMove: 1,
			},
			{
				roomName: "W6N8",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				canEnergyCreepsPickup: true,
				partsPerMove: 1,
			},
			{
				roomName: "W7N7",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				canEnergyCreepsPickup: true,
				partsPerMove: 1,
			},
		]
	},
	{
		roomName: "W7N9",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 3 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 2 },
			{ builder: 6 },
			{ controllerEnergizer: 1 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 3,
		maxEnergizersPerContainer: 4,
		minDefendersWaiting: 2,
		canEnergizersTransferToDropContainers: true,
		canEnergyCreepsHarvest: true,
		canEnergyCreepsPickup: true,
		canControllerEnergizersBuild: true,
		remoteRooms: [
			{
				roomName: "W7N10",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				canEnergyCreepsPickup: true,
				partsPerMove: 1,
			},
			{
				roomName: "W8N9",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				canEnergyCreepsPickup: true,
				partsPerMove: 1,
			},
			{
				roomName: "W6N9",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				canEnergyCreepsPickup: true,
				partsPerMove: 1,
			},
		]
	},
];

// var creepsSpawnRules = [
// 	{
// 		roomName: "W7N8",
// 		spawnOrderMaxSpawnedCounts: [
// 			{ repairer: 2 },
// 			{ builder: 6 },
// 			{ spawnEnergizer: 1 },
// 			{ dropHarvester: 0 },
// 			{ extensionEnergizer: 6 },
// 			{ dropContainerHarvester: 4 },
// 			{ storageEnergizer: 1 },
// 			{ controllerEnergizer: 10 },
// 		],
// 		waitForMinimumSpawnCapacity: false,
// 		maxExtensionsPerEnergizer: 4,
// 		maxEnergizersPerContainer: 3,
// 		canEnergizersTransferToDropContainers: false,
// 		canEnergyCreepsHarvest: false,
// 		canEnergyCreepsPickup: false,
// 		canControllerEnergizersBuild: true,
// 		remoteRooms: [
// 			{
// 				roomName: "W7N9",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ repairer: 0 },
// 					{ remoteBuilder: 0 },
// 					{ builder: 0 },
// 					{ remoteStorageEnergizer: 0 },
// 					{ controllerEnergizer: 0 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				minDefendersWaiting: 2,
// 				canEnergyCreepsHarvest: true,
// 				canEnergyCreepsPickup: false,
// 			},
// 			{
// 				roomName: "W8N8",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ repairer: 1 },
// 					{ remoteReserver: 1 },
// 					{ rangedDefender: 2 },
// 					{ dropContainerHarvester: 1 },
// 					{ dropHarvester: 2 },
// 					{ storageEnergizer: 2 },
// 					{ builder: 2 },
// 					{ remoteBuilder: 4 },
// 					{ remoteSpawnedStorageEnergizer: 3 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				minDefendersWaiting: 2,
// 				canEnergyCreepsHarvest: false,
// 				canEnergyCreepsPickup: true,
// 			},
// 			{
// 				roomName: "W7N7",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ repairer: 1 },
// 					{ remoteReserver: 1 },
// 					{ rangedDefender: 2 },
// 					{ builder: 2 },
// 					{ dropHarvester: 2 },
// 					{ remoteSpawnedStorageEnergizer: 3 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: false,
// 				canEnergyCreepsPickup: true,
// 			},
// 			{
// 				roomName: "W6N8",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ repairer: 1 },
// 					{ remoteReserver: 1 },
// 					{ rangedDefender: 2 },
// 					{ remoteBuilder: 0 },
// 					{ builder: 4 },
// 					{ dropHarvester: 4 },
// 					{ storageEnergizer: 1 },
// 					{ remoteSpawnedStorageEnergizer: 2 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: true,
// 				canEnergyCreepsPickup: true,
// 			},
// 		]
// 	},
// 	{
// 		roomName: "W7N9",
// 		spawnOrderMaxSpawnedCounts: [
// 			{ repairer: 2 },
// 			{ spawnEnergizer: 2 },
// 			{ extensionEnergizer: 3 },
// 			{ dropContainerHarvester: 4 },
// 			{ storageEnergizer: 1 },
// 			{ builder: 12 },
// 			{ controllerEnergizer: 12 },
// 		],
// 		waitForMinimumSpawnCapacity: false,
// 		maxExtensionsPerEnergizer: 3,
// 		maxEnergizersPerContainer: 3,
// 		minDefendersWaiting: 2,
// 		canEnergizersTransferToDropContainers: true,
// 		canEnergyCreepsHarvest: true,
// 		canEnergyCreepsPickup: false,
// 		canControllerEnergizersBuild: true,
// 		remoteRooms:[
// 			{
// 				roomName: "W6N9",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ remoteReserver: 1 },
// 					{ dropHarvester: 2 },
// 					{ remoteSpawnedStorageEnergizer: 2 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: true,
// 				canEnergyCreepsPickup: true,
// 			},
// 			{
// 				roomName: "W7N10",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ dropHarvester: 1 },
// 					{ remoteSpawnedStorageEnergizer: 1 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: true,
// 				canEnergyCreepsPickup: true,
// 			},
// 			{
// 				roomName: "W8N9",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ remoteReserver: 1 },
// 					{ dropHarvester: 2 },
// 					{ remoteSpawnedStorageEnergizer: 2 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: true,
// 				canEnergyCreepsPickup: true,
// 			},
// 			{
// 				roomName: "W6N8",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ repairer: 1 },
// 					{ rangedDefender: 1 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: true,
// 				canEnergyCreepsPickup: true,
// 			},
// 			{
// 				roomName: "W7N7",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ repairer: 1 },
// 					{ rangedDefender: 1 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: false,
// 				canEnergyCreepsPickup: true,
// 			},
// 			{
// 				roomName: "W8N8",
// 				spawnOrderMaxSpawnedCounts: [
// 					{ repairer: 1 },
// 					{ rangedDefender: 1 },
// 				],
// 				waitForMinimumSpawnCapacity: false,
// 				maxExtensionsPerEnergizer: 2,
// 				maxEnergizersPerContainer: 3,
// 				canEnergyCreepsHarvest: false,
// 				canEnergyCreepsPickup: true,
// 			},
// 		]
// 	},
// ];

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