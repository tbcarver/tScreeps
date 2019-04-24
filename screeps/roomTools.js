

var debug = require("./debug");
var roomTools = {};

roomTools.createConstructionSites = function() {

	var positions = 
	[{"x":"16","y":"2","roomName":"W5N3"},{"x":"17","y":"2","roomName":"W5N3"},{"x":"18","y":"2","roomName":"W5N3"},{"x":"16","y":"1","roomName":"W5N3"},{"x":"17","y":"1","roomName":"W5N3"},{"x":"18","y":"1","roomName":"W5N3"},{"x":"19","y":"1","roomName":"W5N3"},{"x":"19","y":"2","roomName":"W5N3"}]
	if (positions.length > 0) {

		var structureType = STRUCTURE_ROAD;
		var name;

		for (var index in positions) {
	
			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);
			var result = global.room.createConstructionSite(position, structureType, name);
			debug.highlight("New Construction Site:", result);
		}
	}
}

roomTools.lookAt = function() {

	var positions = 
	[{"x":"4","y":"22","roomName":"W5N3"}]

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);

			var looked = global.room.lookAt(position);
			// var looked = global.room.lookAt(positions[index]);
			// var looked = global.room.lookAt(global.spawn);
			// var looked = global.room.lookAt(15, 15);
			// debug.danger(positions[index]);
			debug.danger(looked);
		}
	}
}

roomTools.visualize = function(pathToObject, pathFromObject) {

	var path = global.room.findPath(pathToObject.pos, pathFromObject.pos, {ignoreCreeps:true});

	// debug.danger(global.spawn.pos);

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

	// 	debug.danger(location)
	// 	global.room.visual.rect(0, 0, location, 15, 15, {fill:"#777"})
	global.room.visual.circle(location, {radius:1/2,fill:"danger"});
	// global.room.visual.rect(0, 0, location, .60, .60, {fill:"#777"})
	}
		// global.room.visual.circle(global.spawn.pos.x + 5, global.spawn.pos.y + 5, {radius:.30,fill:"danger"});
}

module.exports = roomTools;