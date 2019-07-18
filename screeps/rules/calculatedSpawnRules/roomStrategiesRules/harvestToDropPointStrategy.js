
var dropStrategyTools = require("./dropStrategyTools");
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../../rules/spawnOrderMaxSpawnedCount");

var harvestToDropPointStrategy = {
	coolOffCount: 150,
};

harvestToDropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule) {

	var creepsSpawnRule;
	var room = Game.rooms[remoteRoomName];
	if (room) {

		var remoteReserverCount = dropStrategyTools.getRemoteReserverCount(room);
		var dropHarvesterCount = dropStrategyTools.getDropHarvesterCount(room, spawnCreepsSpawnRule);

		creepsSpawnRule = {
			roomName: remoteRoomName,
			spawnOrderMaxSpawnedCounts: [],
			partsPerMove: 1,
			measure: {
				harvestedEnergy: {},
				canRecalculate: false,
			},
		}

		creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ remoteReserver: remoteReserverCount });

		var sources = roomTools.getSources(remoteRoomName);

		for (var source of sources) {

			creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ remoteSpawnedDropTransferer: 2, creepSubType: source.id, creepMemory: { sourceId: source.id } });

			creepsSpawnRule.measure.harvestedEnergy[source.id] = {
				totalEnergyCount: 0,
				totalEnergy: 0,
				averageTotalEnergy: 0,
			};
		}

		// dropHarvester will be moved after remoteReserver when recalculation starts
		creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ dropHarvester: dropHarvesterCount });

	} else {
		debug.danger(`harvestToDropPointStrategy: room not found for ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

harvestToDropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

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
			var sources = roomTools.getSources(creepsSpawnRule.roomName);

			for (var source of sources) {

				creepType = "remoteSpawnedDropTransferer";
				var creepTypeKey = SpawnOrderMaxSpawnedCount.buildCreepTypeKey(creepType, source.id);
				currentSpawnedCount = currentSpawnedCounts[creepTypeKey] || 0;
				spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType, source.id);
				maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];

				debug.temp(currentSpawnedCount, maxSpawnedCount, creepTypeKey);

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
			debug.warning(`harvestToDropPointStrategy: room not found for ${creepsSpawnRule.roomName}`);
		}
	}
}

harvestToDropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

	if (creepsSpawnRule.measure.canRecalculate) {

		var room = Game.rooms[creepsSpawnRule.roomName];
		if (room) {

			var sources = roomTools.getSources(room.name);

			for (var source of sources) {
				var resources = roomTools.GetSourceWritableDroppedResources(room.name, source.id);
				dropStrategyTools.measureEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
			}

		} else {
			debug.warning(`harvestToDropPointStrategy: room not found for ${creepsSpawnRule.roomName}`);
		}
	} else {
		dropStrategyTools.setCanRecalculate(creepsSpawnRule, currentSpawnedCounts);
	}
}

harvestToDropPointStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = false;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (!storageStats.hasStorage || storageStats.percentageStoredEnergy < 99) {
		canApplyRule = true;
	}

	return canApplyRule;
}


module.exports = harvestToDropPointStrategy;