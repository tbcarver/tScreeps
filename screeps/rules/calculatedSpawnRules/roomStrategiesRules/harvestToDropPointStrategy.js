
var dropStrategyTools = require("./dropStrategyTools");
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../../rules/spawnOrderMaxSpawnedCount");

var harvestToDropPointStrategy = {
	coolOffCount: 150,
};

harvestToDropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule, creepsSpawnRuleKey) {

	var creepsSpawnRule;
	var spawnRoom = Game.rooms[spawnRoomName];
	if (spawnRoom) {
		var remoteRoom = Game.rooms[remoteRoomName];
		if (remoteRoom) {

			var remoteReserverCount = dropStrategyTools.getRemoteReserverCount(spawnRoom, remoteRoom);
			var dropHarvesterCount = dropStrategyTools.getDropHarvesterCount(spawnRoom, remoteRoom, spawnCreepsSpawnRule);

			creepsSpawnRule = {
				creepsSpawnRuleKey: creepsSpawnRuleKey,
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
			roomTools.addObservingRoom(remoteRoomName);
			debug.warning(`harvestToDropPointStrategy: room not found for ${remoteRoomName}, added observing room`);
		}
	} else {
		debug.danger(`dropPointStrategy: spawn room not found for ${spawnRoomName}`);
	}

	return creepsSpawnRule;
}

harvestToDropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule, currentSpawnedCounts) {

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
				var sources = roomTools.getSources(remoteRoomName);

				for (var source of sources) {

					creepType = "remoteSpawnedDropTransferer";
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

					if (maxSpawnedCount < 1) {
						maxSpawnedCount = 1;
					}

					spawnOrderMaxSpawnedCount[creepType] = maxSpawnedCount;
				}
			} else {
				roomTools.addObservingRoom(remoteRoomName);
				debug.warning(`harvestToDropPointStrategy: room not found for ${remoteRoomName}, added observing room`);
			}
		} else {
			debug.danger(`dropPointStrategy: spawn room not found for ${spawnRoomName}`);
		}
	}
}

harvestToDropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule, currentSpawnedCounts) {

	var remoteRoomName = creepsSpawnRule.roomName;

	if (creepsSpawnRule.measure.canRecalculate) {

		var room = Game.rooms[remoteRoomName];
		if (room) {

			var sources = roomTools.getSources(room.name);
			var resources;

			for (var source of sources) {
				resources = roomTools.GetSourceWritableDroppedResources(room.name, source.id);
				dropStrategyTools.measureEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
					
				resources = roomTools.getSourcesWritableDropContainers(remoteRoomName, source.id);
				dropStrategyTools.measureEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
			}

		} else {
			debug.warning(`harvestToDropPointStrategy: room not found for ${remoteRoomName}`);
		}
	} else {
		dropStrategyTools.setCanRecalculate(creepsSpawnRule, currentSpawnedCounts);
	}
}

harvestToDropPointStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = true;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (storageStats && storageStats.hasStorage && storageStats.percentageStoredEnergy >= 100) {
		canApplyRule = false;
	}

	return canApplyRule;
}


module.exports = harvestToDropPointStrategy;