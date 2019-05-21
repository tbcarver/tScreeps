
var { creepTypeNames } = require("./creepTypes");
var customCreepFactory = require("./customCreepFactory");
var customCreepSpawner = require("./customCreepSpawner");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {};
	var remoteCreepsStatistics = {};

	for (creepTypeName of creepTypeNames) {
		creepsStatistics[creepTypeName] = 0;
		remoteCreepsStatistics[creepTypeName] = 0;
	}

	for (var index in Game.creeps) {
		
		var creep = Game.creeps[index];

		if (!creep.spawning) {

			var customCreep = customCreepFactory.buildCreep(creep);
	
			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);
			customCreep.act();

			if (creep.memory.remoteRoomName) {
				remoteCreepsStatistics[creep.memory.type]++;
			} else {
				creepsStatistics[creep.memory.type]++;
			}
		}
	}

	debug.muted(`creeps:`, Object.keys(Game.creeps).length, creepsStatistics);
	debug.muted(`remote creeps:`, remoteCreepsStatistics);
	customCreepSpawner.spawnCreep(creepsStatistics, remoteCreepsStatistics);
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;