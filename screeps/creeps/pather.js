
var debug = require("../debug");
var coreMath = require("../../lib/core/extensions/coreMath")

var pather = {};

pather.spawn = function(id, sourceName, targetName) {

	var patherMemory = {
		type: "pather",
		sourceName: sourceName,
		targetName: targetName,
		serializedPath: ""
	}

	var source;
	var target;

	switch (sourceName) {

		case "spawn":

			source = global.spawn;
			break;
	}

	switch (targetName) {
		case "spawn":

			target = global.spawn;
			break;

		case "controller":

			target = global.controller;
			break;
	}

	if (source && target) {

		var serializedPath = global.room.findPath(source.pos, target.pos, { serialize: true });

		debug.blue(serializedPath);
		patherMemory.serializedPath = serializedPath;
		debug.red("pather memory: ", patherMemory);

		var result = spawn.spawnCreep([WORK, WORK, CARRY, MOVE], id, { memory: patherMemory });

		if (result === OK) {

			debug.yellow(`pather spawning: ${id} source: ${sourceName} target: ${targetName} memory: `, patherMemory);

		} else {

			debug.red(`pather not spawning: ${result}`);
		}
	}
}

pather.act = function(creep) {

	if (creep.moveByPath(creep.memory.serializedPath) === ERR_NOT_FOUND) {

		path = Room.deserializePath(creep.memory.serializedPath);
		creep.moveTo(path[0].x, path[0].y);
	}
}


module.exports = pather