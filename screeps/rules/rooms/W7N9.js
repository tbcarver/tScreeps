
module.exports = {
	roomName: "W7N9",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 3 },
		{ extensionEnergizer: 12 },
		{ dropContainerHarvester: 4 },
		{ storageEnergizer: 3 },
		{ builder: 6 },
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
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageEnergizer: 3 },
				{ remoteSpawnedStorageEnergizer: 3 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageEnergizer: 4 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		// Very remote rooms
		{
			roomName: "W9N9",
			spawnOrderMaxSpawnedCounts: [
				{ dropHarvester: 0 },
				{ remoteSpawnedStorageEnergizer: 0 },
				{ remoteControllerAttacker: 1 },
			],
			partsPerMove: 1,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		{
			roomName: "W10N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedHarvester: 4 },
			],
			partsPerMove: 1,
			canRemoteStorageEnergizersPickup: true,
			canStorageEnergizersPickup: true,
		},
		// Main rooms
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageEnergizer: 12 },
			],
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		// Mob
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 2 },
				{ healer: 3 },
				{ rangedAttacker: 3 },
			],
			isMobTroopers: true,
		},
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 2 },
				{ healer: 3 },
				{ rangedAttacker: 3 },
			],
			isMobTroopers: true,
		},
		// Defending rooms
		{
			roomName: "W6N10",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		{
			roomName: "W8N11",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		{
			roomName: "W9N10",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		{
			roomName: "W6N8",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		{
			roomName: "W7N11",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
		},
		// Overflow		
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 16 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}