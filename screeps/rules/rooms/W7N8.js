
module.exports = {
	roomName: "W7N8",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 4 },
		{ builder: 0 },
		{ storageEnergizer: 1 },
		{ controllerEnergizer: 1 },
	],
	waitForMinimumSpawnCapacity: false,
	maxExtensionsPerEnergizer: 4,
	maxEnergizersPerContainer: 3,
	canEnergizersTransferToDropContainers: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	canControllerEnergizersBuild: true,
	remoteRooms: [
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageEnergizer: 0 },
				{ controllerEnergizer: 0 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ builder: 0 },
			],
			minTroopersWaiting: 1,
			minTroopersWaiting: 3,
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 2 },
				{ storageEnergizer: 2 },
				{ builder: 0 },
				{ remoteBuilder: 0 },
				{ remoteSpawnedStorageEnergizer: 2 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 3,
			minTroopersWaiting: 3,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageEnergizer: 0 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
		},
		{
			roomName: "W6N8",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageEnergizer: 3 },
				{ remoteSpawnedStorageEnergizer: 4 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 3,
			minTroopersWaiting: 3,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 2 },
				{ storageEnergizer: 2 },
				{ remoteSpawnedStorageEnergizer: 3 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 3,
			minTroopersWaiting: 3,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
			canControllerEnergizersBuild: true,
		},
		// Overflow		
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 2 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}