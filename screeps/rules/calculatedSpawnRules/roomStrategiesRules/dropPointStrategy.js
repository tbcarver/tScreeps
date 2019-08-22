
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
			roomTools.removeObservingRoom(remoteRoomName);
			
			if (roomTools.hasDropFlag(remoteRoomName) || roomTools.hasStorage(remoteRoomName)) {

				var remoteReserverCount = dropStrategyTools.getRemoteReserverCount(spawnRoom, remoteRoom);
				var dropHarvesterCount = dropStrategyTools.getDropHarvesterCount(spawnRoom, remoteRoom, spawnCreepsSpawnRule, remoteReserverCount);
				var remoteSpawnedDropTransfererCount = spawnRoomName !== remoteRoomName ? 6 : 0;
				var partsPerMove = 2;
				var roads = remoteRoom.find(FIND_STRUCTURES, {
					filter: { structureType: STRUCTURE_ROAD }
				})

				if (roads.length === 0) {
					partsPerMove = 1;
				}

				creepsSpawnRule = {
					creepsSpawnRuleKey: creepsSpawnRuleKey,
					roomName: remoteRoomName,
					spawnOrderMaxSpawnedCounts: [],
					partsPerMove: partsPerMove,
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

					creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ dropTransferer: 1, creepSubType: source.id, creepMemory: { sourceId: source.id } });

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
				debug.danger(`dropPointStrategy: drop flag or storage not found for ${remoteRoomName}`);
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

dropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule, currentSpawnedCounts) {

	var remoteRoomName = creepsSpawnRule.roomName;

	if (creepsSpawnRule.measure.canRecalculate) {

		var spawnRoom = Game.rooms[spawnRoomName];
		if (spawnRoom) {

			var currentSpawnedCount = 0;
			var remoteRoom = Game.rooms[remoteRoomName];
			if (remoteRoom) {

				var partsPerMove = 2;
				var roads = remoteRoom.find(FIND_STRUCTURES, {
					filter: { structureType: STRUCTURE_ROAD }
				})

				if (roads.length === 0) {
					partsPerMove = 1;
				}

				creepsSpawnRule.partsPerMove = partsPerMove;

				var creepType = "remoteReserver";
				var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
				var remoteReserverCount = dropStrategyTools.getRemoteReserverCount(spawnRoom, remoteRoom);
				spawnOrderMaxSpawnedCount[creepType] = remoteReserverCount;

				creepType = "dropHarvester";
				spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
				spawnOrderMaxSpawnedCount[creepType] = dropStrategyTools.getDropHarvesterCount(spawnRoom, remoteRoom, creepsSpawnRule, remoteReserverCount);

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

					if (maxSpawnedCount < 1) {
						maxSpawnedCount = 1;
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

					if (maxSpawnedCount < 1) {
						maxSpawnedCount = 1;
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

dropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule, currentSpawnedCounts, creepsSpawnRuleKey) {

	var remoteRoomName = creepsSpawnRule.roomName;

	if (creepsSpawnRule.measure.canRecalculate) {

		var resources;
		if (Game.rooms[remoteRoomName]) {
			if (roomTools.hasDropFlag(remoteRoomName) || roomTools.hasStorage(remoteRoomName)) {

				// Dropped energy measurement only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
				if (spawnRoomName !== remoteRoomName) {
					resources = roomTools.GetDropFlagWritableDroppedResources(remoteRoomName);
					dropStrategyTools.measureWritableEnergy(creepsSpawnRule.measure.droppedEnergy, resources);
				}

				var sources = roomTools.getSources(remoteRoomName);

				for (var source of sources) {
					resources = roomTools.GetSourceWritableDroppedResources(remoteRoomName, source.id);
					var additionalResources = roomTools.getSourcesWritableDropContainers(remoteRoomName, source.id);

					resources = [...resources, ...additionalResources];

					dropStrategyTools.measureWritableEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
				}

			} else {
				debug.danger(`dropPointStrategy: drop flag or storage not found for ${remoteRoomName}`);
			}

		} else {
			debug.warning(`dropPointStrategy: room not found for ${remoteRoomName}`);
		}
	} else {
		dropStrategyTools.setCanRecalculate(creepsSpawnRule, currentSpawnedCounts, creepsSpawnRuleKey);
	}
}

dropPointStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = true;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (storageStats && storageStats.hasStorage && storageStats.percentageStoredEnergy >= 100) {
		canApplyRule = false;
	}

	return canApplyRule;
}


module.exports = dropPointStrategy;