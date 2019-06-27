
var spawnTools = require("../tools/spawnTools");
var creepsFactory = require("./creepsFactory");
var creepsSpawner = require("./creepsSpawner");
var { rules, creepsToSpawnTotal, spawnedRoomsCreepsToSpawnTotal } = require("../rules/rules");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var roomsCurrentSpawnedCounts = {};
	var displayRoomsCurrentSpawnedCounts = {};
	var creepsTotal = 0;
	var spawnedRoomNamesCreepsTotal = {};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		try {

			var baseCreep = creepsFactory.buildCreep(creep);

			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);+
			if (!creep.spawning) {
				baseCreep.act();
			}

		} catch (error) {

			if (error instanceof Error) {

				let sourceMap = require("../sourceMap");
				sourceMap.logStackTrace(error);

			} else {
				throw error;
			}
		}

		creepsTotal++;
		if (!spawnedRoomNamesCreepsTotal[baseCreep.spawnedRoomName]) {
			spawnedRoomNamesCreepsTotal[baseCreep.spawnedRoomName] = 0;
		}
		spawnedRoomNamesCreepsTotal[baseCreep.spawnedRoomName]++;

		spawnTools.incrementSpawnedCount(roomsCurrentSpawnedCounts, creep.memory.type, creep.memory.spawnedRoomName,
			creep.memory.remoteRoomName);

		if (creep.memory.remoteRoomName) {
			spawnTools.incrementSpawnedCount(displayRoomsCurrentSpawnedCounts, creep.memory.type, creep.memory.remoteRoomName);
		} else {
			spawnTools.incrementSpawnedCount(displayRoomsCurrentSpawnedCounts, creep.memory.type, creep.memory.spawnedRoomName);
		}
	}

	creepsSpawner.spawnCreep(roomsCurrentSpawnedCounts);

	var displayCreepsTotal = `total creeps: ${creepsTotal}/${creepsToSpawnTotal} `;
	for (var spawnedRoomName in spawnedRoomsCreepsToSpawnTotal) {
		displayCreepsTotal += `, ${spawnedRoomName}: ${spawnedRoomNamesCreepsTotal[spawnedRoomName]}/${spawnedRoomsCreepsToSpawnTotal[spawnedRoomName]} `;
	}

	if (rules.logRoomsCurrentSpawnedCounts) {
		debugObjectTable.muted(displayRoomsCurrentSpawnedCounts, creepsTotal, displayCreepsTotal + " stats...");
	} else {
		debug.muted(displayCreepsTotal);
	}
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;