
module.exports = {
	roomName: "W8N10",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ builder: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 4 },
		{ storageEnergizer: 3 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canEnergizersTransferToStorageOnly: true,
	maxExtensionsPerEnergizer: 4,
	remoteRooms: [
		{
			roomName: "W8N11",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageEnergizer: 5 },
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
			roomName: "W9N10",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageEnergizer: 5 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 3,
			minTroopersWaiting: 3,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
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