
module.exports = {
	roomName: "W7N8",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 6 },
		{ dropContainerHarvester: 4 },
		{ builder: 6 },
		{ storageTransferer: 1 },
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
			roomName: "W6N8",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 2 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 11 },
			],
			partsPerMove: 1,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Main rooms
		// Mob
		{
			roomName: "W6N9",
			roomStrategy: "mobDefense",
		},
		{
			roomName: "W7N7",
			roomStrategy: "mobDefense",
		},
		{
			roomName: "W9N6",
			roomStrategy: "mobDefense",
		},
		// Very remote rooms
		{
			roomName: "W7N6",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W6N7",
			roomStrategy: "harvestToDropPoint",
		},
		// Overflow		
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 12 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}