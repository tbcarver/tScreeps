
module.exports = {
	roomName: "W8N9",
	spawnOrderMaxSpawnedCounts: [
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 4 },
		{ dropContainerHarvester: 4 },
		{ containerHarvester: 0 },
		{ storageTransferer: 2 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: false,
	canEnergyCreepsPickup: true,
	canStorageTransferersPickup: true,
	maxExtensionsPerEnergizer: 8,
	remoteRooms: [
		// Adjacent remote rooms		
		{
			roomName: "W9N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ storageTransferer: 2 },
				{ remoteSpawnedStorageTransferer: 8 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		// Very remote rooms
		{
			roomName: "W10N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 3 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
		},
		{
			roomName: "W11N9",
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: 4 },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			canStorageTransferersPickup: true,
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
		// Overflow
		{
			roomName: "W8N10",
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 12 },
			],
			canControllerEnergizersBuild: true,
		},
	]
}