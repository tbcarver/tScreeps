
var dropStrategyTools = require("./dropStrategyTools");
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../../rules/spawnOrderMaxSpawnedCount");

var dropPointStrategy = {
	coolOffCount: 150,
};

dropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule, creepsSpawnRuleKey) {

	var creepsSpawnRule;
	var spawnRoom = Game.rooms[spawnRoomName];
	if (spawnRoom) {
		var remoteRoom = Game.rooms[remoteRoomName];
		if (remoteRoom) {
			if (roomTools.hasDropFlag(remoteRoomName)) {

				var remoteReserverCount = dropStrategyTools.getRemoteReserverCount(spawnRoom, remoteRoom);
				var dropHarvesterCount = dropStrategyTools.getDropHarvesterCount(spawnRoom, remoteRoom, spawnCreepsSpawnRule);
				var remoteSpawnedDropTransfererCount = spawnRoomName !== remoteRoomName ? 6 : 0;

				creepsSpawnRule = {
					creepsSpawnRuleKey: creepsSpawnRuleKey,
					roomName: remoteRoomName,
					spawnOrderMaxSpawnedCounts: [],
					partsPerMove: 1,
					canRemoteStorageTransferersPickup: true,
					canStorageTransferersPickup: true,
					measure: {
						droppedEnergy: {
							totalEnergyCount: 0,
							totalEnergy: 0
						},
						harvestedEnergy: {},
						canRecalculate: false,
					},
				}

				creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ remoteReserver: remoteReserverCount });

				var sources = roomTools.getSources(remoteRoomName);

				for (var source of sources) {

					creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ dropTransferer: 2, creepSubType: source.id, creepMemory: { sourceId: source.id } });

					creepsSpawnRule.measure.harvestedEnergy[source.id] = {
						totalEnergyCount: 0,
						totalEnergy: 0,
						averageTotalEnergy: 0,
					};
				}

				creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ remoteSpawnedStorageTransferer: remoteSpawnedDropTransfererCount });

				// dropHarvester will be moved after remoteReserver when recalculation starts
				creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ dropHarvester: dropHarvesterCount });

			} else {
				debug.danger(`dropPointStrategy: drop flag not found for ${remoteRoomName}`);
			}
		} else {
			roomTools.addObservingRoom(remoteRoomName);
			debug.warning(`dropPointStrategy: remote room not found for ${remoteRoomName}, added observing room`);
		}
	} else {
		debug.danger(`dropPointStrategy: spawn room not found for ${spawnRoomName}`);
	}

	return creepsSpawnRule;
}

dropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

	var remoteRoomName = creepsSpawnRule.roomName;

	if (creepsSpawnRule.measure.canRecalculate) {

		var spawnRoom = Game.rooms[spawnRoomName];
		if (spawnRoom) {

			var currentSpawnedCount = 0;
			var remoteRoom = Game.rooms[remoteRoomName];
			if (remoteRoom) {

				var creepType = "remoteReserver";
				var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
				spawnOrderMaxSpawnedCount[creepType] = dropStrategyTools.getRemoteReserverCount(spawnRoom, remoteRoom);

				creepType = "dropHarvester";
				spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
				spawnOrderMaxSpawnedCount[creepType] = dropStrategyTools.getDropHarvesterCount(spawnRoom, remoteRoom, creepsSpawnRule);

				var maxSpawnedCount;
				var storageStats = roomTools.getStorageStats(spawnRoomName);
				var isAtStorageLimit = (storageStats.hasStorage && storageStats.percentageStoredEnergy >= 95);

				// Dropped energy recalculation only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
				if (spawnRoomName !== remoteRoomName) {

					creepType = "remoteSpawnedStorageTransferer";
					currentSpawnedCount = currentSpawnedCounts[creepType] || 0;
					spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
					maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];

					maxSpawnedCount = dropStrategyTools.recalculateEnergy(creepsSpawnRule, creepType, creepsSpawnRule.measure.droppedEnergy, maxSpawnedCount, currentSpawnedCount);


					if (isAtStorageLimit) {
						if (maxSpawnedCount > 5) {
							maxSpawnedCount = 5;
						}
					}

					if (maxSpawnedCount > roomTools.getSpawnsCount(spawnRoomName) * 10) {
						maxSpawnedCount = roomTools.getSpawnsCount(spawnRoomName) * 10;
					}

					spawnOrderMaxSpawnedCount[creepType] = maxSpawnedCount;
				}

				var sources = roomTools.getSources(remoteRoomName);

				for (var source of sources) {

					creepType = "dropTransferer";
					var creepTypeKey = SpawnOrderMaxSpawnedCount.buildCreepTypeKey(creepType, source.id);
					currentSpawnedCount = currentSpawnedCounts[creepTypeKey] || 0;
					spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType, source.id);
					maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];

					maxSpawnedCount = dropStrategyTools.recalculateEnergy(creepsSpawnRule, creepType, creepsSpawnRule.measure.harvestedEnergy[source.id], maxSpawnedCount, currentSpawnedCount);

					if (isAtStorageLimit) {
						if (maxSpawnedCount > 1) {
							maxSpawnedCount = 1;
						}
					}

					if (maxSpawnedCount > roomTools.getSpawnsCount(spawnRoomName) * 5) {
						maxSpawnedCount = roomTools.getSpawnsCount(spawnRoomName) * 5;
					}

					spawnOrderMaxSpawnedCount[creepType] = maxSpawnedCount;
				}
			} else {
				roomTools.addObservingRoom(remoteRoomName);
				debug.warning(`dropPointStrategy: room not found for ${remoteRoomName}, added observing room`);
			}
		} else {
			debug.danger(`dropPointStrategy: spawn room not found for ${spawnRoomName}`);
		}
	}
}

dropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

	var remoteRoomName = creepsSpawnRule.roomName;

	if (creepsSpawnRule.measure.canRecalculate) {

		var resources;
		if (Game.rooms[remoteRoomName]) {
			if (roomTools.hasDropFlag(remoteRoomName)) {

				// Dropped energy measurement only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
				if (spawnRoomName !== remoteRoomName) {
					resources = roomTools.GetDropFlagWritableDroppedResources(remoteRoomName);
					dropStrategyTools.measureEnergy(creepsSpawnRule.measure.droppedEnergy, resources);
				}

				var sources = roomTools.getSources(remoteRoomName);

				for (var source of sources) {
					resources = roomTools.GetSourceWritableDroppedResources(remoteRoomName, source.id);
					dropStrategyTools.measureEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
					
					resources = roomTools.getSourcesWritableDropContainers(remoteRoomName, source.id);
					dropStrategyTools.measureEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
				}

			} else {
				debug.danger(`dropPointStrategy: drop flag not found for ${remoteRoomName}`);
			}

		} else {
			debug.warning(`dropPointStrategy: room not found for ${remoteRoomName}`);
		}
	} else {
		dropStrategyTools.setCanRecalculate(creepsSpawnRule, currentSpawnedCounts);
	}
}

dropPointStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = false;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (!storageStats.hasStorage || storageStats.percentageStoredEnergy < 99) {
		canApplyRule = true;
	}

	return canApplyRule;
}


module.exports = dropPointStrategy;