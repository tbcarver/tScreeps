
var debug = require("../debug");

var roadBuilder = {};

roadBuilder.build = function(pathToObject, pathFromObject) {

	var path = global.room.findPath(pathToObject.pos, pathFromObject.pos, {ignoreCreeps:true});

	debug.red(global.spawn.pos);

	for (var location of path) {

		if (location.x === 39 && location.y === 7) {
			continue;
		}

		if (location.x === 38 && location.y === 8) {
			continue;
		}

		if (location.x === 37 && location.y === 8) {
			continue;
		}

	// 	debug.red(location)
	// 	global.room.visual.rect(0, 0, location, 15, 15, {fill:"#777"})
	global.room.visual.circle(location, {radius:1/2,fill:"red"});
	// global.room.visual.rect(0, 0, location, .60, .60, {fill:"#777"})
	}
		// global.room.visual.circle(global.spawn.pos.x + 5, global.spawn.pos.y + 5, {radius:.30,fill:"red"});
}


module.exports = roadBuilder