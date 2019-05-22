
var creepsFactory = require("./creepsFactory");
var creepsSpawner = require("./creepsSpawner");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (!creep.spawning) {

			var customCreep = creepsFactory.buildCreep(creep);

			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);
			customCreep.act();

			if (!creepsStatistics[creep.memoryRoomName]) {
				creepsStatistics[creep.memoryRoomName] = {};
			}

			var creepsStatistic = creepsStatistics[creep.memoryRoomName];

			if (creep.memory.remoteRoomName && !creepsStatistics[creep.memoryRoomName][creep.memory.remoteRoomName]) {
				creepsStatistics[creep.memoryRoomName][creep.memory.remoteRoomName] = {};
				creepsStatistic = creepsStatistics[creep.memoryRoomName][creep.memory.remoteRoomName];
			}

			if (!creepsStatistic[creep.memory.type]) {
				creepsStatistic[creep.memory.type] = 0;
			}

			creepsStatistic[creep.memory.type]++;
		}
	}

	_.forEach(creepsStatistics, creepsStatistic => {
		var totalCreeps = _.reduce(creepsStatistic, (result, value) => result += value, 0);
		debug.muted(`creeps:`, totalCreeps, creepsStatistic);
	});

	creepsSpawner.spawnCreep(creepsStatistics);
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;