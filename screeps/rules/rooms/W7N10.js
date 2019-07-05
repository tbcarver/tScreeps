
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
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	canStorageTransferersPickup: false,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W6N10",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W7N11",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 16 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Main rooms
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
				{ controllerEnergizer: 0 },
				{ remoteBuilder: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
				{ controllerEnergizer: 0 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: true,
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: true,
		},
		// Very remote rooms
		{
			roomName: "W6N12",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		{
			roomName: "W6N11",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		{
			roomName: "W7N12",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		// Overflow
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
				{ controllerEnergizer: 12 },
			],
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageTransferer: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
	],
}