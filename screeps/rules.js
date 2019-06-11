// TODO: error handling for bad creep type

var rules = {
	maximumRangedDefenderSpawnCapacity: 600,
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
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ rangedDefender: 2 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ storageEnergizer: 2 },
					{ builder: 2 },
					{ remoteBuilder: 2 },
					{ remoteSpawnedStorageEnergizer: 1 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 1,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: false,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W6N8",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				partsPerMove: 1,
				canRemoteStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N7",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				partsPerMove: 1,
				canRemoteStorageEnergizersPickup: true,
			},
		]
	},
	{
		roomName: "W7N9",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 4 },
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
				roomName: "W8N9",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 1 },
					{ rangedDefender: 2 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ storageEnergizer: 2 },
					{ builder: 2 },
					{ remoteBuilder: 2 },
					{ remoteSpawnedStorageEnergizer: 1 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 1,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: false,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N10",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				partsPerMove: 1,
				canRemoteStorageEnergizersPickup: true,
			},
			{
				roomName: "W6N9",
				spawnOrderMaxSpawnedCounts: [
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				partsPerMove: 1,
				canRemoteStorageEnergizersPickup: true,
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

var creepsToSpawnTotal = 0;
var roomsCreepsToSpawnTotal = {};

for (creepsSpawnRule of creepsSpawnRules) {
	roomsCreepsToSpawnTotal[creepsSpawnRule.roomName] = 0;

	for (spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

		var creepType = Object.keys(spawnOrderMaxSpawnedCount)[0]
		creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];	
		roomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
	}

	if (creepsSpawnRule.remoteRooms) {
		for (remoteRoom of creepsSpawnRule.remoteRooms) {
			for (remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

				creepType = Object.keys(remoteSpawnOrderMaxSpawnedCount)[0]
				creepsToSpawnTotal += remoteSpawnOrderMaxSpawnedCount[creepType];
				roomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += remoteSpawnOrderMaxSpawnedCount[creepType];
			}
		}
	}
}

module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.roomNamesCreepsSpawnRules = roomNamesCreepsSpawnRules;
module.exports.creepsToSpawnTotal = creepsToSpawnTotal;