
var dropStrategyTools = require("./dropStrategyTools");
var flagTools = require("../../../tools/flagTools");
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../../rules/spawnOrderMaxSpawnedCount");

var dropPointStrategy = {
	coolOffCount: 150,
};

dropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule) {

	var creepsSpawnRule;
	var room = Game.rooms[remoteRoomName];
	if (room) {
		if (flagTools.hasDropFlag(remoteRoomName)) {

			var remoteReserverCount = dropStrategyTools.getRemoteReserverCount(room);
			var dropHarvesterCount = dropStrategyTools.getDropHarvesterCount(room, spawnCreepsSpawnRule);
			var remoteSpawnedDropTransfererCount = spawnRoomName !== remoteRoomName ? 6 : 0;

			creepsSpawnRule = {
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
		debug.warning(`dropPointStrategy: room not found for ${remoteRoomName}, observing room`);
	}

	return creepsSpawnRule;
}

dropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

	if (creepsSpawnRule.measure.canRecalculate) {

		var currentSpawnedCount = 0;
		var room = Game.rooms[creepsSpawnRule.roomName];

		if (room) {

			var creepType = "remoteReserver";
			var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
			spawnOrderMaxSpawnedCount[creepType] = dropStrategyTools.getRemoteReserverCount(room);

			creepType = "dropHarvester";
			spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
			spawnOrderMaxSpawnedCount[creepType] = dropStrategyTools.getDropHarvesterCount(room, creepsSpawnRule);

			var maxSpawnedCount;
			var storageStats = roomTools.getStorageStats(spawnRoomName);
			var isAtStorageLimit = (storageStats.hasStorage && storageStats.percentageStoredEnergy >= 95);

			// Dropped energy recalculation only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
			if (spawnRoomName !== creepsSpawnRule.roomName) {

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

			var sources = roomTools.getSources(creepsSpawnRule.roomName);

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
			observersController.observeRoom(remoteRoomName);
			debug.warning(`dropPointStrategy: room not found for ${remoteRoomName}, observing room`);
		}
	}
}

dropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

	if (creepsSpawnRule.measure.canRecalculate) {

		var room = Game.rooms[creepsSpawnRule.roomName];
		if (room) {
			if (flagTools.hasDropFlag(creepsSpawnRule.roomName)) {

				// Dropped energy measurement only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
				if (spawnRoomName !== creepsSpawnRule.roomName) {
					var resources = roomTools.GetDropFlagWritableDroppedResources(room.name);
					dropStrategyTools.measureEnergy(creepsSpawnRule.measure.droppedEnergy, resources);
				}

				var sources = roomTools.getSources(room.name);

				for (var source of sources) {
					var resources = roomTools.GetSourceWritableDroppedResources(room.name, source.id);
					dropStrategyTools.measureEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
				}

			} else {
				debug.danger(`dropPointStrategy: drop flag not found for ${creepsSpawnRule.roomName}`);
			}

		} else {
			debug.warning(`dropPointStrategy: room not found for ${creepsSpawnRule.roomName}`);
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