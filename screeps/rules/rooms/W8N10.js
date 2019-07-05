
module.exports = {
	roomName: "W8N10",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ builder: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 4 },
		{ storageTransferer: 2 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W8N11",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 6 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 3,
			minTroopersWaiting: 3,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W9N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 10 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 3,
			minTroopersWaiting: 3,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Main rooms
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
				{ controllerEnergizer: 0 },
				{ remoteBuilder: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
				{ controllerEnergizer: 0 },
				{ remoteBuilder: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		// Very remote rooms
		{
			roomName: "W8N12",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		{
			roomName: "W9N11",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		{
			roomName: "W10N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		{
			roomName: "W11N10",
			spawnOrderMaxSpawnedCounts: [
				{ dropHarvester: 2 },
				{ remoteSpawnedDropTransferer: 3 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		{
			roomName: "W10N11",
			spawnOrderMaxSpawnedCounts: [
				{ dropHarvester: 3 },
				{ remoteSpawnedDropTransferer: 3 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
		},
		// Overflow
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 6 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}