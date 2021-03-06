
module.exports = {
	roomName: "W7N8",
	spawnOrderMaxSpawnedCounts: [
		{ spawnEnergizer: 1 },
		{ extensionEnergizer: 6 },
		{ dropContainerHarvester: 4 },
		{ storageTransferer: 1 },
		{ controllerEnergizer: 1 },
	],
	canControllerEnergizersBuild: true,
	canEnergyCreepsHarvest: true,
	canEnergyCreepsPickup: true,
	maxExtensionsPerEnergizer: 8,
	partsPerMove: 1,
	spawnProviderTo: "W12N16",
	remoteRooms: [
		// Mob
		{
			roomName: "W6N9",
			roomStrategy: "mobDefense",
		},
		{
			roomName: "W9N6",
			roomStrategy: "mobDefense",
		},
		// Adjacent remote rooms
		{
			roomName: "W6N8",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W7N7",
			roomStrategy: "dropPoint",
		},
		// Main rooms
		// Very remote rooms
		{
			roomName: "W7N6",
			roomStrategy: "harvestToDropPoint",
		},
		{
			roomName: "W6N7",
			roomStrategy: "harvestToDropPoint",
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