
module.exports = {
	roomName: "W7N8",
	spawnOrderMaxSpawnedCounts: [
		{ repairer: 0 },
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 12 },
		{ dropContainerHarvester: 4 },
		{ builder: 6 },
		{ storageTransferer: 1 },
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
			roomName: "W6N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 3 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 2 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 5 },
			],
			partsPerMove: 1,
			minTroopersWaiting: 1,
			canEnergyCreepsPickup: true,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Main rooms
		{
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageTransferer: 12 },
			],
			canControllerEnergizersBuild: true,
			canEnergizersTransferToStorageOnly: true,
		},
		{
			roomName: "W7N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteSpawnedStorageTransferer: 0 },
				{ controllerEnergizer: 0 },
			],
			canEnergizersTransferToStorageOnly: true,
			canEnergyCreepsHarvest: false,
			canEnergyCreepsPickup: true,
			canControllerEnergizersBuild: true,
		},
		// Mob
		{
			roomName: "W6N9",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 3 },
				{ healer: 3 },
				{ rangedAttacker: 4 },
			],
			isMobTroopers: true,
		},
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 2 },
				{ healer: 3 },
				{ rangedAttacker: 3 },
			],
			isMobTroopers: true,
		},
		{
			roomName: "W9N6",
			spawnOrderMaxSpawnedCounts: [
				{ attacker: 2 },
				{ healer: 3 },
				{ rangedAttacker: 3 },
			],
			isMobTroopers: true,
		},
		// Defending rooms
		{
			roomName: "W10N8",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W9N8",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W6N8",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W10N7",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W9N7",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W8N7",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W7N7",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W6N7",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W9N6",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W8N6",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
		},
		{
			roomName: "W7N6",
			spawnOrderMaxSpawnedCounts: [
				{ decoy: 1 },
			],
			minTroopersWaiting: 1,
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
			roomName: "W8N8",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}