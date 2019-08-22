
var dropStrategyTools = require("./dropStrategyTools");
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../spawnOrderMaxSpawnedCount");
var sumBy = require("lodash/sumBy");

var remoteSpawnedDropTransferStrategy = {
	coolOffCount: 150,
	energyTransferPercent: 100,
};

remoteSpawnedDropTransferStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule, creepsSpawnRuleKey) {

	var creepsSpawnRule;
	if (spawnRoomName !== remoteRoomName) {
		var room = Game.rooms[remoteRoomName];
		if (room) {
			roomTools.removeObservingRoom(remoteRoomName);
			
			if (roomTools.hasDropFlag(remoteRoomName)) {

				creepsSpawnRule = {
					creepsSpawnRuleKey: creepsSpawnRuleKey,
					roomName: remoteRoomName,
					spawnOrderMaxSpawnedCounts: [],
					partsPerMove: 1,
					canRemoteStorageTransferersPickup: true,
					measure: {
						droppedEnergy: {
							totalEnergyCount: 0,
							totalEnergy: 0
						},
						canRecalculate: true,
					},
				}

				creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ remoteSpawnedStorageTransferer: 4 });

			} else {
				debug.danger(`remoteSpawnedDropTransferStrategy: drop flag not found for ${remoteRoomName}`);
			}
		} else {
			roomTools.addObservingRoom(remoteRoomName);
			debug.warning(`remoteSpawnedDropTransferStrategy: room not found for ${remoteRoomName}, added observing room`);
		}
	} else {
		debug.warning(`remoteSpawnedDropTransferStrategy: spawn and remote rooms are the same ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

remoteSpawnedDropTransferStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule, currentSpawnedCounts) {

	var remoteRoomName = creepsSpawnRule.roomName;

	if (creepsSpawnRule.measure.canRecalculate) {

		var room = Game.rooms[remoteRoomName];

		if (room) {

			var maxSpawnedCount;
			var storageStats = roomTools.getStorageStats(spawnRoomName);
			var isAtStorageLimit = (storageStats.hasStorage && storageStats.percentageStoredEnergy >= 95);

			var creepType = "remoteSpawnedStorageTransferer";
			var currentSpawnedCount = currentSpawnedCounts[creepType] || 0;
			var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
			var maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];

			maxSpawnedCount = dropStrategyTools.recalculateEnergy(creepsSpawnRule, creepType, creepsSpawnRule.measure.droppedEnergy, maxSpawnedCount, currentSpawnedCount);

			if (isAtStorageLimit) {
				if (maxSpawnedCount > 5) {
					maxSpawnedCount = 5;
				}
			}

			if (maxSpawnedCount > roomTools.getSpawnsCount(spawnRoomName) * 10) {
				maxSpawnedCount = roomTools.getSpawnsCount(spawnRoomName) * 10;
			}

			if (maxSpawnedCount < 1) {
				maxSpawnedCount = 1;
			}

			spawnOrderMaxSpawnedCount[creepType] = maxSpawnedCount;

		} else {
			roomTools.addObservingRoom(remoteRoomName);
			debug.warning(`remoteSpawnedDropTransferStrategy: room not found for ${remoteRoomName}, added observing room`);
		}
	}
}

remoteSpawnedDropTransferStrategy.measureCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule, currentSpawnedCounts) {

	var energyTransferPercent = remoteRoomCreepsSpawnRule.energyTransferPercent || this.energyTransferPercent;
	var remoteRoomName = creepsSpawnRule.roomName;
	var room = Game.rooms[remoteRoomName];

	if (room) {
		if (roomTools.hasDropFlag(remoteRoomName)) {

			var resources = roomTools.GetDropFlagWritableDroppedResources(room.name);
			dropStrategyTools.measureWritableEnergy(creepsSpawnRule.measure.droppedEnergy, resources, energyTransferPercent);

		} else {
			debug.danger(`remoteSpawnedDropTransferStrategy: drop flag not found for ${remoteRoomName}`);
		}
	} else {
		debug.warning(`remoteSpawnedDropTransferStrategy: room not found for ${remoteRoomName}`);
	}
}

remoteSpawnedDropTransferStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = true;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (storageStats && storageStats.hasStorage && storageStats.percentageStoredEnergy >= 100) {
		canApplyRule = false;
	}

	return canApplyRule;
}


module.exports = remoteSpawnedDropTransferStrategy;


