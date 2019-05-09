
var customCreepFactory = require("./creeps/customCreepFactory");
var customCreepSpawner = require("./creeps/customCreepSpawner");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {
		builders: 0,
		containerHarvesters: 0,
		controllerEnergizers: 0,
		defenders: 0,
		dropContainerHarvesters: 0,
		extensionEnergizers: 0,
		repairers: 0,
		spawnEnergizers: 0,
		wallRepairers: 0
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];
		var customCreep = customCreepFactory.buildCreep(creep, creepsStatistics);

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