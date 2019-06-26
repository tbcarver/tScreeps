
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
	canEnergizersTransferToDropContainers: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	maxExtensionsPerEnergizer: 4,
	waitForMinimumSpawnCapacity: true,
	remoteRooms: [
		// Adjacent rooms for W8N8
		{
			roomName: "W9N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageTransferer: 3 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W8N7",
			spawnOrderMaxSpawnedCounts: [
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 6 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Main rooms
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 2 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
			canControllerEnergizersBuild: true,
		},
		// Very remote rooms
		{
			roomName: "W10N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 6 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W8N6",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W9N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W9N6",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W10N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
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