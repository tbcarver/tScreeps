
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
	canTransferersTransferToStorageOnly: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Mob
		{
			roomName: "W6N11",
			roomStrategy: "mobDefense",
		},
		{
			roomName: "W9N9",
			roomStrategy: "mobDefense",
		},
		{
			roomName: "W7N7",
			roomStrategy: "mobDefense",
		},
		// Adjacent remote rooms
		{
			roomName: "W6N9",
			roomStrategy: "harvestToDropPoint",
		},
		// Main rooms
		// Overflow	
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
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