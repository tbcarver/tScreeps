

// var assert = require("assert");
// var simple = require("simple-mock");

// describe("/screeps/rules/calculatedSpawnRules/storageTransferRule", function() {

// 	describe("addCalculatedSpawnRule()", function() {

// 		it("should return ", function() {


// 			mergeRemoteRoomOptions(creepsSpawnRules);

// 		});
// 	});
// });






// function mergeRemoteRoomOptions(creepsSpawnRules) {

// 	for (var creepsSpawnRule of creepsSpawnRules) {

// 		var topRemoteRooms = {};

// 		for (var remoteRoom of creepsSpawnRule.remoteRooms) {

// 			if (topRemoteRooms[remoteRoom.roomName]) {

// 				for (var optionName in remoteRoom) {
// 					if (!(optionName === "roomName" || optionName === "spawnOrderMaxSpawnedCounts")) {
// 						topRemoteRooms[remoteRoom.roomName][optionName] = remoteRoom[optionName];
// 					}
// 				}
// 			} else {
// 				topRemoteRooms[remoteRoom.roomName] = remoteRoom;
// 			}
// 		}
// 	}
// }


// var creepsSpawnRules = [{
// 	roomName: "W7N8",
// 	spawnOrderMaxSpawnedCounts: [
// 		{ repairer: 0 },
// 		{ spawnEnergizer: 1 },
// 		{ extensionEnergizer: 6 },
// 		{ dropContainerHarvester: 4 },
// 		{ builder: 6 },
// 		{ storageTransferer: 1 },
// 		{ controllerEnergizer: 1 },
// 	],
// 	canControllerEnergizersBuild: true,
// 	canEnergyCreepsHarvest: false,
// 	canEnergyCreepsPickup: false,
// 	canStorageTransferersPickup: false,
// 	maxExtensionsPerEnergizer: 8,
// 	remoteRooms: [
// 		// Adjacent remote rooms
// 		{
// 			roomName: "W6N8",
// 			spawnOrderMaxSpawnedCounts: [
// 				{ remoteReserver: 1 },
// 				{ dropHarvester: 4 },
// 				{ remoteSpawnedStorageTransferer: 5 },
// 			],
// 			partsPerMove: 1,
// 			minTroopersWaiting: 1,
// 			canEnergyCreepsPickup: true,
// 			canRemoteStorageTransferersPickup: true,
// 			canStorageTransferersPickup: true,
// 		},
// 		{
// 			roomName: "W7N7",
// 			spawnOrderMaxSpawnedCounts: [
// 				{ remoteReserver: 1 },
// 				{ dropHarvester: 2 },
// 				{ storageTransferer: 2 },
// 				{ remoteSpawnedStorageTransferer: 11 },
// 			],
// 			partsPerMove: 1,
// 			canEnergyCreepsPickup: true,
// 			canRemoteStorageTransferersPickup: true,
// 			canStorageTransferersPickup: true,
// 		},
// 		{
// 			roomName: "W7N7",
// 			spawnOrderMaxSpawnedCounts: [
// 				{ attacker: 2 },
// 				{ healer: 3 },
// 				{ rangedAttacker: 3 },
// 			],
// 			isMobTroopers: true,
// 		},
// 		// Overflow		
// 		{
// 			roomName: "W8N8",
// 			spawnOrderMaxSpawnedCounts: [
// 				{ controllerEnergizer: 12 },
// 			],
// 			canControllerEnergizersBuild: true,
// 		},
// 		{
// 			roomName: "W6N8",
// 			spawnOrderMaxSpawnedCounts: [
// 				{ controllerEnergizer: 12 },
// 			],
// 			partsPerMove: 2,
// 		},
// 	]
// }];