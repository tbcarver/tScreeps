
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

			if (!roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName]) {
				roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName] = {};
				roomsTotals[creep.memory.spawnedRoomName] = 0;
			}

			var currentSpawnedCounts = roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName];

			if (creep.memory.remoteRoomName){

				if (!roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName].remoteRooms) {
					roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName].remoteRooms = {};
				}

				if (!currentSpawnedCounts.remoteRooms[creep.memory.remoteRoomName]) {
					currentSpawnedCounts.remoteRooms[creep.memory.remoteRoomName] = {};
				}	

				currentSpawnedCounts = currentSpawnedCounts.remoteRooms[creep.memory.remoteRoomName];
			}

			if (!currentSpawnedCounts[creep.memory.type]) {
				currentSpawnedCounts[creep.memory.type] = 0;
			}

			currentSpawnedCounts[creep.memory.type]++;
			roomsTotals[creep.memory.spawnedRoomName]++;
		}
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