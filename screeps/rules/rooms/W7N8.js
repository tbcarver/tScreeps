
module.exports = {
	roomName: "W7N8",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 12 },
		{ dropContainerHarvester: 4 },
		{ builder: 6 },
		{ storageEnergizer: 1 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canEnergizersTransferToDropContainers: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	maxExtensionsPerEnergizer: 4,
	waitForMinimumSpawnCapacity: true,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ dropContainerHarvester: 3 },
				{ containerHarvester: 1 },
				{ remoteSpawnedStorageEnergizer: 2 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
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
			minTroopersWaiting: 1,
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
				{ remoteSpawnedStorageEnergizer: 5 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		// Adjacent rooms for W8N8
		{
			roomName: "W9N8",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 1 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageEnergizer: 0 },
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
				{ defender: 1 },
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageEnergizer: 0 },
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
		// Mob
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 1 },
				{ healer: 2 },
				{ rangedAttacker: 2 },
			],
			isMobTroopers: true,
		},
		// Very remote rooms
		{
			roomName: "W7N6",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W6N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canEnergyCreepsHarvest: true,
			canEnergizersTransferToStorageOnly: true,
		},
		// Overflow		
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}