
var creepsFactory = require("./creepsFactory");
var creepsSpawner = require("./creepsSpawner");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var roomsCurrentSpawnedCounts = {};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (!creep.spawning) {

			var customCreep = creepsFactory.buildCreep(creep);

			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);
			customCreep.act();

			if (!roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName]) {
				roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName] = {};
				roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName].remoteRooms = {};
			}

			var currentSpawnedCounts = roomsCurrentSpawnedCounts[creep.memory.spawnedRoomName];

			if (creep.memory.remoteRoomName && !currentSpawnedCounts.remoteRooms[creep.memory.remoteRoomName]) {
				currentSpawnedCounts.remoteRooms[creep.memory.remoteRoomName] = {};
			}

			if (creep.memory.remoteRoomName) {
				currentSpawnedCounts = currentSpawnedCounts.remoteRooms[creep.memory.remoteRoomName];
			}

			if (!currentSpawnedCounts[creep.memory.type]) {
				currentSpawnedCounts[creep.memory.type] = 0;
			}

			currentSpawnedCounts[creep.memory.type]++;
		}
	}

	_.forEach(roomsCurrentSpawnedCounts, currentSpawnedCounts => {

		var totalCreeps = _.reduce(currentSpawnedCounts, (result, value, key) => {

			if (key === "remoteRooms") {
				var remoteSpawnedCounts = Object.values(value);

				result += remoteSpawnedCounts.reduce((result, value) => {

					result += _.reduce(value, (result, value) => result += value, 0);
					return result;
				}, 0);
			} else {
				result += value;
			}

			return result;
		}, 0);

		debug.muted(`creeps: ${totalCreeps}`, currentSpawnedCounts);
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