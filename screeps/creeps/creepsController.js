
var { creepTypeNames } = require("./creepTypes");
var customCreepFactory = require("./customCreepFactory");
var customCreepSpawner = require("./customCreepSpawner");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {};

	for (creepTypeName of creepTypeNames) {
		creepsStatistics[creepTypeName] = 0;
	}

	for (var index in Game.creeps) {
		
		var creep = Game.creeps[index];

		if (!creep.spawning) {

			var customCreep = customCreepFactory.buildCreep(creep);
	
			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);
			customCreep.act();
			creepsStatistics[creep.memory.type]++;
		}
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