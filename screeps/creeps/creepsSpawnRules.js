// TODO: error handling for bad creep type

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
			{ controllerEnergizer: 6 },
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
					{ repairer: 2 },
					{ rangedDefender: 2 },
					{ remoteReserver: 1 },
					{ remoteBuilder: 4 },
					{ builder: 2 },
					{ dropContainerHarvester: 4 },
					{ remoteSpawnedStorageEnergizer: 3 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				maximumTroopersSpawnCapacity: 800,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: true,
				canEnergyCreepsPickup: false,
			},
			{
				roomName: "W8N8",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 2 },
					{ rangedDefender: 2 },
					{ remoteReserver: 1 },
					{ dropHarvester: 3 },
					{ builder: 2 },
					{ remoteBuilder: 2 },
					{ remoteSpawnedPickupEnergizer: 4 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				maximumTroopersSpawnCapacity: 800,
				minDefendersWaiting: 2,
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: true,
			},
			{
				roomName: "W7N7",
				spawnOrderMaxSpawnedCounts: [
					{ remoteReserver: 1 },
					{ builder: 4 },
					{ dropHarvester: 2 },
					{ remoteSpawnedPickupEnergizer: 4 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				maximumTroopersSpawnCapacity: 800,
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: true,
			},
			{
				roomName: "W6N8",
				spawnOrderMaxSpawnedCounts: [
					{ repairer: 2 },
					{ remoteBuilder: 4 },
					{ builder: 2 },
					{ remoteReserver: 1 },
					{ dropHarvester: 4 },
					{ remoteSpawnedPickupEnergizer: 5 },
				],
				waitForMinimumSpawnCapacity: false,
				maxExtensionsPerEnergizer: 2,
				maxEnergizersPerContainer: 3,
				maximumTroopersSpawnCapacity: 800,
				canEnergyCreepsHarvest: false,
				canEnergyCreepsPickup: true,
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

module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.roomNamesCreepsSpawnRules = roomNamesCreepsSpawnRules;