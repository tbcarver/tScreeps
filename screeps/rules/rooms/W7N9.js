
module.exports = {
	roomName: "W7N9",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 2 },
		{ extensionEnergizer: 12 },
		{ dropContainerHarvester: 4 },
		{ storageTransferer: 3 },
		{ builder: 6 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canEnergyCreepsHarvest: false,
	canEnergyCreepsPickup: false,
	canStorageTransferersPickup: false,
	maxExtensionsPerEnergizer: 4,
	waitForMinimumSpawnCapacity: true,
	remoteRooms: [
		// Adjacent remote rooms
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedStorageTransferer: 4 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Very remote rooms

		// Main rooms
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ dropContainerHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteStorageTransferer: 0 },
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageTransferer: 4 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W7N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageTransferer: 4 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		// Mob
		{
			roomName: "W6N11",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 3 },
				{ healer: 3 },
				{ rangedAttacker: 4 },
			],
			isMobTroopers: true,
		},
		{
			roomName: "W9N9",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 2 },
				{ healer: 3 },
				{ rangedAttacker: 3 },
			],
			isMobTroopers: true,
		},
		// Defending rooms
		{
			roomName: "W10N9",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W9N9",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		
		{
			roomName: "W10N10",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W9N10",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W6N10",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W10N11",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W9N11",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W8N11",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W7N11",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W6N11",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W8N12",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W7N12",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W6N12",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		// Overflow		
		{
			roomName: "W8N9",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 12 },
			],
			canControllerEnergizersBuild: true,
		},
		{
			roomName: "W7N10",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}