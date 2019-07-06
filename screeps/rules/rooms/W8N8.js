
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
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	canStorageTransferersPickup: false,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent rooms
		{
			roomName: "W9N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 7 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W8N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 10 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
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
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
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