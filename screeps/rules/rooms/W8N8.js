
module.exports = {
	roomName: "W8N8",
	spawnOrderMaxSpawnedCounts: [
		{ builder: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 3 },
		{ containerHarvester: 1 },
		{ storageTransferer: 2 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canTransferersTransferToStorageOnly: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent rooms
		{
			roomName: "W9N8",
			roomStrategy: "dropPoint",
		},
		{
			roomName: "W8N7",
			roomStrategy: "dropPoint",
		},
		// Main rooms
		// Very remote rooms
		{
			roomName: "W10N8",
			roomStrategy: "harvestToDropPoint",
		},

		{
			roomName: "W10N7",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W9N7",
			roomStrategy: "harvestToDropPoint",
		},
		
		{
			roomName: "W9N6",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W8N6",
			roomStrategy: "harvestToDropPoint",
		},
		// Overflow
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}