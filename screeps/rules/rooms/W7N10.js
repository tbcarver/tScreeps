
module.exports = {
	roomName: "W7N10",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ containerHarvester: 2 },
		{ dropContainerHarvester: 2 },
		{ storageTransferer: 2 },
		{ builder: 0 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canTransferersTransferToStorageOnly: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W6N10",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W7N11",
			roomStrategy: "dropPoint",
		},
		// Main rooms
		// Very remote rooms
		{
			roomName: "W6N12",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W6N11",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W7N12",
			roomStrategy: "harvestToDropPoint",
		},
		// Overflow
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
	],
}