
module.exports = {
	roomName: "W7N9",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 2 },
		{ spawnEnergizer: 2 },
		{ extensionEnergizer: 8 },
		{ dropContainerHarvester: 4 },
		{ storageEnergizer: 6 },
		{ builder: 0 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canEnergizersTransferToDropContainers: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	maxExtensionsPerEnergizer: 4,
	maxEnergizersPerContainer: 4,
	waitForMinimumSpawnCapacity: false,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageEnergizer: 3 },
				{ remoteSpawnedStorageEnergizer: 3 },
			],
			partsPerMove: 1,
			minTroopersWainting: 1,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageEnergizer: 5 },
			],
			partsPerMove: 1,
			minTroopersWainting: 1,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		// Main rooms
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageEnergizer: 10 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
		},
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageEnergizer: 10 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
		},
		// Remote rooms
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
			],
			partsPerMove: 1,
			minTroopersWainting: 1,
		},
		{
			roomName: "W6N10",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
			],
			partsPerMove: 1,
			minTroopersWainting: 1,
		},
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
			],
			partsPerMove: 1,
			minTroopersWainting: 1,
		},
		{
			roomName: "W6N8",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
			],
			partsPerMove: 1,
			minTroopersWainting: 1,
		},
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
			],
			partsPerMove: 1,
			minTroopersWainting: 1,
		},
	]
}