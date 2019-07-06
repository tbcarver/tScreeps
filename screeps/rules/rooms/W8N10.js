
module.exports = {
	roomName: "W8N10",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ builder: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 6 },
		{ dropContainerHarvester: 4 },
		{ storageTransferer: 2 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canTransferersTransferToStorageOnly: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W8N11",
			roomStrategy: "dropPoint",
		},
		{
			roomName: "W9N10",
			roomStrategy: "dropPoint",
		},
		// Main rooms
		// Mob
		{
			roomName: "W10N10",
			roomStrategy: "mobDefense",
		},
		// Very remote rooms
		{
			roomName: "W8N12",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W9N11",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W10N10",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W11N10",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W10N11",
			roomStrategy: "harvestToDropPoint",
		},
		// Overflow
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 6 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}