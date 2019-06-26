
module.exports = {
	roomName: "W8N8",
	spawnOrderMaxSpawnedCounts: [
		{ builder: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 3 },
		{ containerHarvester: 1 },
		{ storageEnergizer: 2 },
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
				{ remoteSpawnedStorageEnergizer: 3 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		{
			roomName: "W8N7",
			spawnOrderMaxSpawnedCounts: [
				{ storageEnergizer: 2 },
				{ remoteSpawnedStorageEnergizer: 6 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		// Main rooms
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageEnergizer: 2 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
			canControllerEnergizersBuild: true,
		},
		// Very remote rooms
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
				{ controllerEnergizer: 4 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}