
module.exports = {
	roomName: "W8N9",
	spawnOrderMaxSpawnedCounts: [
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 2 },
		{ dropContainerHarvester: 0 },
		{ containerHarvester: 0 },
		{ storageTransferer: 0 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: false,
	canEnergyCreepsPickup: true,
	canStorageTransferersPickup: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent remote rooms		
		{
			roomName: "W9N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 6 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Overflow
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 12 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}