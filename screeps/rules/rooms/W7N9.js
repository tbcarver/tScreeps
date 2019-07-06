
module.exports = {
	roomName: "W7N9",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 6 },
		{ dropContainerHarvester: 4 },
		{ storageTransferer: 2 },
		{ builder: 6 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	canStorageTransferersPickup: false,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W6N9",
			roomStrategy: "harvestToDropPoint",
		},
		// Main rooms
		// Mob
		{
			roomName: "W6N11",
			roomStrategy: "mobDefense",
		},
		{
			roomName: "W9N9",
			roomStrategy: "mobDefense",
		},
		// Defending rooms
		{
			roomName: "W10N9",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 0 },
			],
			minTroopersWaiting: 1,
		},
		// Overflow		
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
				{ controllerEnergizer: 12 },
			],
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}