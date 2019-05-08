
var debug = require("./debug");
var customCreepFactory = require("./creeps/customCreepFactory");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {
		builders: 0,
		containerEnergizers: 0,
		controllerEnergizers: 0,
		defenders: 0,
		extensionEnergizers: 0,
		repairers: 0,
		spawnEnergizers: 0,
		wallRepairers: 0
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];
		var customCreep = customCreepFactory(creep, creepsStatistics);

		// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);
		customCreep.act();
	}

	debug.muted(`creeps:`, Object.keys(Game.creeps).length, creepsStatistics);
	customCreepSpawner.spawnCreep(creepsStatistics);
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;