
module.exports = {
	roomName: "W7N10",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ containerHarvester: 2 },
		{ dropContainerHarvester: 2 },
		{ storageTransferer: 3 },
		{ builder: 0 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	canStorageTransferersPickup: false,
	maxExtensionsPerEnergizer: 8,
	waitForMinimumSpawnCapacity: true,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W6N10",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageTransferer: 4 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W7N11",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 3 },
				{ remoteSpawnedStorageTransferer: 6 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Main rooms
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 4 },
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
		// Mob		
		{
			roomName: "W9N11",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 2 },
				{ healer: 3 },
				{ rangedAttacker: 3 },
			],
			isMobTroopers: true,
		},
		// Very remote rooms
		{
			roomName: "W6N11",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: true,
		},
		{
			roomName: "W7N12",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: true,
		},
		{
			roomName: "W6N12",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: true,
		},
		// Overflow
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
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
	],
}