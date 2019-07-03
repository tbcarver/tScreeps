
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
				{ remoteSpawnedStorageTransferer: 5 },
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
				{ remoteSpawnedStorageTransferer: 6 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Main rooms
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
			],
		},
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
			],
		},
		// Very remote rooms
		{
			roomName: "W10N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},

		{
			roomName: "W10N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 3 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W9N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 3 },
				{ remoteSpawnedDropTransferer: 4 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		
		{
			roomName: "W9N6",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 4 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W8N6",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 3 },
				{ remoteSpawnedDropTransferer: 4 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
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