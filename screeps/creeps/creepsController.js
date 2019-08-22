
var roomTools = require("../tools/roomTools");
var spawnTools = require("../tools/spawnTools");
var creepsFactory = require("./creepsFactory");
var creepsSpawner = require("./creepsSpawner");
var { rules } = require("../rules/rules");
var sourceMap = require("../sourceMap");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var roomsCurrentSpawnedCounts = {};
	var displayRoomsCurrentSpawnedCounts = {};
	var creepsTotal = 0;
	var creepsSpawnBufferTotal = 0;
	var spawnedRoomNamesCreepsTotal = {};

	for (var creepName in Game.creeps) {

		var creep = Game.creeps[creepName];

		try {

			if (!creep.spawning) {

				var baseCreep = creepsFactory.buildCreep(creep);
				baseCreep.act();
			}

		} catch (error) {

			if (error instanceof Error) {

				sourceMap.logStackTrace(error);

			} else {
				throw error;
			}
		}

		if (!spawnTools.isCreepInSpawnBuffer(creep)) {
			creepsTotal++;
			if (!spawnedRoomNamesCreepsTotal[creep.memory.spawnedRoomName]) {
				spawnedRoomNamesCreepsTotal[creep.memory.spawnedRoomName] = 0;
			}
			spawnedRoomNamesCreepsTotal[creep.memory.spawnedRoomName]++;


			spawnTools.incrementSpawnedCount(roomsCurrentSpawnedCounts, creep.memory.type, creep.memory.subType, creep.memory.spawnedRoomName,
				creep.memory.remoteRoomName);

			if (creep.memory.remoteRoomName) {
				spawnTools.incrementSpawnedCount(displayRoomsCurrentSpawnedCounts, creep.memory.type, null, creep.memory.remoteRoomName);
			} else {
				spawnTools.incrementSpawnedCount(displayRoomsCurrentSpawnedCounts, creep.memory.type, null, creep.memory.spawnedRoomName);
			}
		} else {
			creepsSpawnBufferTotal++;
		}
	}

	creepsSpawner.spawnCreep(roomsCurrentSpawnedCounts);

	var roomsCount = Object.keys(Game.rooms).length;
	var displayCreepsTotal = `${roomsCount}, ${creepsTotal}/${Memory.state.creepsToSpawnTotal} (${creepsSpawnBufferTotal})`;
	for (var spawnedRoomName in Memory.state.spawnedRoomsCreepsToSpawnTotal) {
		displayCreepsTotal += `, ${spawnedRoomName}: ${spawnedRoomNamesCreepsTotal[spawnedRoomName] || 0}/${Memory.state.spawnedRoomsCreepsToSpawnTotal[spawnedRoomName]}
			${Math.floor(roomTools.getPercentageStoredEnergy(spawnedRoomName))}%`;
	}

	if (rules.logRoomsCurrentSpawnedCounts) {

		if (rules.logRoomsCurrentSpawnedCounts === "collapsed") {
			debugObjectTable.muted(displayRoomsCurrentSpawnedCounts, creepsTotal, displayCreepsTotal + " stats...");
		} else {
			debug.muted(displayCreepsTotal);
			debugObjectTable.muted(displayRoomsCurrentSpawnedCounts, creepsTotal);
		}
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