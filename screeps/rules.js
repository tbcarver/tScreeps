// TODO: error handling for bad creep type

var rules = {
	maximumRangedDefenderSpawnCapacity: 600,
}


var creepsSpawnRules = [
	{
		roomName: "W7N8",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ spawnEnergizer: 0 },
			{ extensionEnergizer: 4 },
			{ dropContainerHarvester: 4 },
			{ builder: 0 },
			{ storageEnergizer: 1 },
			{ controllerEnergizer: 1 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 3,
		canEnergizersTransferToDropContainers: true,
		canEnergyCreepsHarvest: false,
		canEnergyCreepsPickup: false,
		canControllerEnergizersBuild: true,
		remoteRooms: [
			{
				roomName: "W7N10",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 0 },
				],
				minDefendersWaiting: 1,
				canControllerEnergizersBuild: true,
			},
			{
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 3 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ storageEnergizer: 2 },
					{ builder: 0 },
					{ remoteBuilder: 0 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 2 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
			},
			{
				roomName: "W6N8",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 3 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ storageEnergizer: 3 },
					{ remoteSpawnedStorageEnergizer: 4 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N7",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 3 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ storageEnergizer: 2 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ controllerEnergizer: 10 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
				canControllerEnergizersBuild: true,
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
			{ storageEnergizer: 3 },
			{ builder: 0 },
			{ controllerEnergizer: 1 },
		],
		canControllerEnergizersBuild: true,
		canEnergizersTransferToDropContainers: true,
		canEnergyCreepsHarvest: false,
		canEnergyCreepsPickup: false,
		canRemoteStorageEnergizersPickup: true,
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 4,
		minDefendersWaiting: 2,
		waitForMinimumSpawnCapacity: false,
		remoteRooms: [
			{
				roomName: "W7N10",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 0 },
					{ remoteStorageEnergizer: 0 },
				],
				minDefendersWaiting: 2,
				canControllerEnergizersBuild: true,
			},
			{
				roomName: "W8N9",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 3 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ storageEnergizer: 2 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W6N9",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 3 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ remoteSpawnedStorageEnergizer: 5 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N8",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
			},
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ controllerEnergizer: 1 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
			},
		]
	},
	{
		roomName: "W7N10",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 4 },
			{ containerHarvester: 2 },
			{ dropContainerHarvester: 2 },
			{ storageEnergizer: 3 },
			{ controllerEnergizer: 1 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 4,
		canEnergizersTransferToDropContainers: true,
		canControllerEnergizersBuild: true,
		remoteRooms: [
			{
				roomName: "W8N10",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 3 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 4 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W6N10",
				spawnOrderMaxSpawnedCounts: [
					{ rangedDefender: 3 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 4 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 8 },
					{ controllerEnergizer: 10 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
				canControllerEnergizersBuild: true,
			},
		],
	},
];

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
var spawnedRoomsCreepsToSpawnTotal = {};

for (creepsSpawnRule of creepsSpawnRules) {
	spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] = 0;

	for (spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

		var creepType = Object.keys(spawnOrderMaxSpawnedCount)[0]
		creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];	
		spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
	}

	if (creepsSpawnRule.remoteRooms) {
		for (remoteRoom of creepsSpawnRule.remoteRooms) {
			for (remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

				creepType = Object.keys(remoteSpawnOrderMaxSpawnedCount)[0]
				creepsToSpawnTotal += remoteSpawnOrderMaxSpawnedCount[creepType];
				spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += remoteSpawnOrderMaxSpawnedCount[creepType];
			}
		}
	}
}

module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.roomNamesCreepsSpawnRules = roomNamesCreepsSpawnRules;
module.exports.creepsToSpawnTotal = creepsToSpawnTotal;
module.exports.spawnedRoomsCreepsToSpawnTotal = spawnedRoomsCreepsToSpawnTotal;