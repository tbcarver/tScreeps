
module.exports = {
	roomName: "W8N9",
	spawnOrderMaxSpawnedCounts: [
		{ spawnEnergizer: 2 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 0 },
		{ containerHarvester: 0 },
		{ storageTransferer: 0 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: false,
	canEnergyCreepsPickup: true,
	canStorageTransferersPickup: true,
	maxExtensionsPerEnergizer: 4,
	waitForMinimumSpawnCapacity: false,
	remoteRooms: [
		// Adjacent remote rooms		
		{
			roomName: "W9N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageTransferer: 6 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Very remote rooms
		{
			roomName: "W10N9",
			spawnOrderMaxSpawnedCounts: [
				{ dropHarvester: 2 },
				{ remoteSpawnedDropTransferer: 3 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W11N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
	]
}