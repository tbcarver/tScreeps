
var spawnTools = require("../tools/spawnTools");
var creepsFactory = require("./creepsFactory");
var creepsSpawner = require("./creepsSpawner");
var mergeWith = require("lodash/mergeWith");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var roomsCurrentSpawnedCounts = {};
	var displayRoomsCurrentSpawnedCounts = {};
	var creepsTotal = 0;

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (!creep.spawning) {

			try {

				var baseCreep = creepsFactory.buildCreep(creep);

				// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);
				baseCreep.act();

			} catch (error) {

				if (error instanceof Error) {

					let sourceMap = require("../sourceMap");
					sourceMap.logStackTrace(error);

				} else {
					throw error;
				}
			}
		}

		creepsTotal++;

		spawnTools.incrementSpawnedCount(roomsCurrentSpawnedCounts, creep.memory.type, creep.memory.spawnedRoomName,
			creep.memory.remoteRoomName);

		if (creep.memory.remoteRoomName) {
			spawnTools.incrementSpawnedCount(displayRoomsCurrentSpawnedCounts, creep.memory.type, creep.memory.remoteRoomName);
		} else {
			spawnTools.incrementSpawnedCount(displayRoomsCurrentSpawnedCounts, creep.memory.type, creep.memory.spawnedRoomName);
		}
	}

	creepsSpawner.spawnCreep(roomsCurrentSpawnedCounts);
	// debug.muted(`${roomName} creeps: ${roomsTotals[roomName]}`, displayRoomsCurrentSpawnedCounts);
	debugObjectTable.muted(displayRoomsCurrentSpawnedCounts, creepsTotal);
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;