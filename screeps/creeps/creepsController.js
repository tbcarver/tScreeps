
var spawnTools = require("../tools/spawnTools");
var creepsFactory = require("./creepsFactory");
var creepsSpawner = require("./creepsSpawner");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var roomsCurrentSpawnedCounts = {};
	var roomsTotals = {};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (!creep.spawning) {

			var customCreep = creepsFactory.buildCreep(creep);

			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);
			customCreep.act();
		}

		if (!roomsTotals[creep.memory.spawnedRoomName]) {
			roomsTotals[creep.memory.spawnedRoomName] = 0;
		}

		roomsTotals[creep.memory.spawnedRoomName]++;

		spawnTools.incrementSpawnedCount(roomsCurrentSpawnedCounts, creep.memory.type, creep.memory.spawnedRoomName,
			 creep.memory.remoteRoomName);
	}

	_.forEach(roomsCurrentSpawnedCounts, (currentSpawnedCounts, roomName) => {

		debug.muted(`${roomName} creeps: ${roomsTotals[roomName]}`, currentSpawnedCounts);
	});

	creepsSpawner.spawnCreep(roomsCurrentSpawnedCounts);
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;