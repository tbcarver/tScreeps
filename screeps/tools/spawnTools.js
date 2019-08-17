
var roomTools = require("./roomTools");
var coreMath = require("../../lib/core/extensions/coreMath");
var { rules } = require("../rules/rules");
var SpawnOrderMaxSpawnedCount = require("../rules/spawnOrderMaxSpawnedCount");

var spawnTools = {};

spawnTools.calculateSpawnCapacity = function(spawn) {

	var room = spawn.room;
	var spawnCapacity = room.energyAvailable;

	// Check if energy is still accumulating
	if (Memory.state.rooms[room.name].lastRoomEnergyAvailable != room.energyAvailable) {

		var extensions = roomTools.getExtensions(room.name);

		var availableExtensionEnergy = extensions.reduce((total, extension) => total + (extension.energy), 0);

		spawnCapacity = spawn.energyCapacity + availableExtensionEnergy;
	}

	return spawnCapacity;
}

spawnTools.calculateBodyCost = function(bodyParts) {

	var cost = bodyParts.reduce(function(cost, part) {
		return cost + BODYPART_COST[part];
	}, 0);

	return cost;
}

spawnTools.isCreepInSpawnBuffer = function(creep) {
	return !(creep.spawning || creep.ticksToLive > rules.creepsTickToLiveSpawnBuffer);
}

/* Example data for rooms spawned counts
	{
		"W6S0": {
			"remoteRooms": {
				"W6N0": {
					"remoteHarvester": 5
					},
				"W6S1": {
					"dropContainerHarvester": 3,
					"storageTransferer": 1
					}
				},
			"dropContainerHarvester": 5,
			"storageTransferer": 3,
		},
		"W6S1": {
			"controllerEnergizer": 2,
			"builder": 8
		}
	}
 */
spawnTools.incrementSpawnedCount = function(roomsSpawnedCounts, creepType, creepSubType, spawnedRoomName, remoteRoomName) {

	var creepTypeKey = SpawnOrderMaxSpawnedCount.buildCreepTypeKey(creepType, creepSubType);

	if (!roomsSpawnedCounts[spawnedRoomName]) {
		roomsSpawnedCounts[spawnedRoomName] = {};
	}

	var spawnedCounts = roomsSpawnedCounts[spawnedRoomName];

	if (remoteRoomName) {

		if (!roomsSpawnedCounts[spawnedRoomName].remoteRooms) {
			roomsSpawnedCounts[spawnedRoomName].remoteRooms = {};
		}

		if (!spawnedCounts.remoteRooms[remoteRoomName]) {
			spawnedCounts.remoteRooms[remoteRoomName] = {};
		}

		spawnedCounts = spawnedCounts.remoteRooms[remoteRoomName];
	}

	if (!spawnedCounts[creepTypeKey]) {
		spawnedCounts[creepTypeKey] = 0;
	}

	spawnedCounts[creepTypeKey]++;
}

spawnTools.getRandomSpawn = function() {

	var spawn;

	var spawnNames = Object.keys(Game.spawns);

	if (spawnNames.length > 0) {

		var randomIndex = coreMath.randomInteger(0, spawnNames.length - 1);
		spawn = Game.spawns[spawnNames[randomIndex]];
	}

	return spawn;
}

module.exports = spawnTools;