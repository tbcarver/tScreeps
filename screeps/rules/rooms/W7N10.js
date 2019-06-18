
module.exports = {
	roomName: "W7N10",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ containerHarvester: 2 },
		{ dropContainerHarvester: 2 },
		{ storageEnergizer: 3 },
		{ builder: 3 },
		{ controllerEnergizer: 1 },
	],
	waitForMinimumSpawnCapacity: false,
	maxExtensionsPerEnergizer: 4,
	canEnergizersTransferToStorageOnly: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	canControllerEnergizersBuild: true,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W6N10",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 0 },
				{ remoteReserver: 1 },
				{ dropHarvester: 2 },
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
		// Main rooms
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageEnergizer: 2 },
				{ controllerEnergizer: 0 },
				{ remoteBuilder: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
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
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageEnergizer: 0 },
			],
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: false,
		},
		// Defending rooms
		{
			roomName: "W6N10",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 2 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
		},
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 2 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
		},
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 2 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
		},
		{
			roomName: "W8N11",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 2 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
		},
		{
			roomName: "W9N10",
			spawnOrderMaxSpawnedCounts: [
				{ defender: 2 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
		},
		// Mob
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 1 },
				{ healer: 1 },
				{ rangedAttacker: 2 },
			],
			isMobTroopers: true,
		},
		// Overflow
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 4 },
			],
			canControllerEnergizersBuild: true,
		},
	],
}