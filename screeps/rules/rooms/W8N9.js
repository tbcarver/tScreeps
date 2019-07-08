
module.exports = {
	roomName: "W8N9",
	spawnOrderMaxSpawnedCounts: [
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 4 },
		{ containerHarvester: 0 },
		{ storageTransferer: 2 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canTransferersTransferToStorageOnly: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Mob
		{
			roomName: "W9N11",
			roomStrategy: "mobDefense",
		},
		// Adjacent remote rooms		
		{
			roomName: "W9N9",
			roomStrategy: "dropPoint",
		},
		// Very remote rooms
		{
			roomName: "W10N9",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W11N9",
			roomStrategy: "harvestToDropPoint",
		},
		// Overflow
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 12 },
			],
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 6 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}