// TODO: error handling for bad creep type

var rules = {
	maximumRangedAttackerSpawnCapacity: 700,
	evacuateRemoteRooms: true,
}

var creepsSpawnRules = [
	{
		roomName: "W7N10",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ spawnEnergizer: 1 },
			{ extensionEnergizer: 4 },
			{ containerHarvester: 2 },
			{ dropContainerHarvester: 2 },
			{ storageEnergizer: 3 },
			{ builder: 3 },
			{ controllerEnergizer: 1 },
		],
		waitForMinimumSpawnCapacity: false,
		maxExtensionsPerEnergizer: 4,
		canEnergizersTransferToDropContainers: true,
		canControllerEnergizersBuild: true,
		remoteRooms: [
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 0 },
					{ controllerEnergizer: 0 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
				canControllerEnergizersBuild: true,
			},
			{
				roomName: "W8N10",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 0 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ remoteSpawnedStorageEnergizer: 4 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 3,
				minAttackersWaiting: 3,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W6N10",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 0 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ remoteSpawnedStorageEnergizer: 4 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 3,
				minAttackersWaiting: 3,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 0 },
					{ controllerEnergizer: 0 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
				canControllerEnergizersBuild: true,
			},
			{
				roomName: "W7N8",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 0 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
			},
		],
	},
	{
		roomName: "W7N9",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 2 },
			{ spawnEnergizer: 2 },
			{ extensionEnergizer: 8 },
			{ dropContainerHarvester: 4 },
			{ storageEnergizer: 6 },
			{ builder: 0 },
			{ controllerEnergizer: 1 },
		],
		canControllerEnergizersBuild: true,
		canEnergizersTransferToDropContainers: true,
		canEnergyCreepsHarvest: false,
		canEnergyCreepsPickup: false,
		maxExtensionsPerEnergizer: 4,
		maxEnergizersPerContainer: 4,
		waitForMinimumSpawnCapacity: false,
		remoteRooms: [
			// Adjacent remote rooms
			{
				roomName: "W8N9",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 1 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ storageEnergizer: 3 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				partsPerMove: 1,
				minAttackersWaiting: 1,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W6N9",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 1 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ remoteSpawnedStorageEnergizer: 5 },
				],
				partsPerMove: 1,
				minAttackersWaiting: 1,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: true,
				canStorageEnergizersPickup: true,
			},
			// Main rooms
			{
				roomName: "W7N10",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSpawnedStorageEnergizer: 10 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
			},
			{
				roomName: "W7N8",
				spawnOrderMaxSpawnedCounts: [
					{ remoteSpawnedStorageEnergizer: 10 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
			},
			// Remote rooms
			{
				roomName: "W8N10",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 1 },
				],
				partsPerMove: 1,
				minAttackersWaiting: 1,
			},
			{
				roomName: "W6N10",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 1 },
				],
				partsPerMove: 1,
				minAttackersWaiting: 1,
			},
			{
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 1 },
				],
				partsPerMove: 1,
				minAttackersWaiting: 1,
			},
			{
				roomName: "W6N8",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 1 },
				],
				partsPerMove: 1,
				minAttackersWaiting: 1,
			},
			{
				roomName: "W7N7",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 1 },
				],
				partsPerMove: 1,
				minAttackersWaiting: 1,
			},
		]
	},
	{
		roomName: "W7N8",
		spawnOrderMaxSpawnedCounts: [
			{ repairer: 1 },
			{ spawnEnergizer: 1 },
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
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 0 },
					{ controllerEnergizer: 0 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
				canControllerEnergizersBuild: true,
			},
			{
				roomName: "W7N10",
				spawnOrderMaxSpawnedCounts: [
					{ builder: 0 },
				],
				minDefendersWaiting: 1,
				minAttackersWaiting: 3,
				canControllerEnergizersBuild: true,
			},
			{
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 0 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ storageEnergizer: 2 },
					{ builder: 0 },
					{ remoteBuilder: 0 },
					{ remoteSpawnedStorageEnergizer: 2 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 3,
				minAttackersWaiting: 3,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ remoteStorageEnergizer: 0 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
			},
			{
				roomName: "W6N8",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 0 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ storageEnergizer: 3 },
					{ remoteSpawnedStorageEnergizer: 4 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 3,
				minAttackersWaiting: 3,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N7",
				spawnOrderMaxSpawnedCounts: [
					{ rangedAttacker: 0 },
					{ remoteReserver: 1 },
					{ dropHarvester: 2 },
					{ storageEnergizer: 2 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				partsPerMove: 1,
				minDefendersWaiting: 3,
				minAttackersWaiting: 3,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: true,
				canRemoteStorageEnergizersPickup: true,
				canStorageEnergizersPickup: true,
			},
			{
				roomName: "W7N9",
				spawnOrderMaxSpawnedCounts: [
					{ controllerEnergizer: 0 },
				],
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: false,
				canControllerEnergizersBuild: true,
			},
		]
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