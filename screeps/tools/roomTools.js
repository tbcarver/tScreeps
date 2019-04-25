

var debug = require("../debug");
var roomTools = {};

roomTools.createConstructionRoad = function() {

	var positions =

		[{ "x": "16", "y": "1", "roomName": "W5N3" }, { "x": "17", "y": "1", "roomName": "W5N3" }, { "x": "18", "y": "1", "roomName": "W5N3" }, { "x": "19", "y": "1", "roomName": "W5N3" }, { "x": "20", "y": "2", "roomName": "W5N3" }, { "x": "21", "y": "3", "roomName": "W5N3" }, { "x": "22", "y": "4", "roomName": "W5N3" }, { "x": "23", "y": "5", "roomName": "W5N3" }, { "x": "24", "y": "6", "roomName": "W5N3" }]

	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

roomTools.createConstructionExtension = function() {

	var positions =

		[{ "x": "3", "y": "19", "roomName": "W5N3" }, { "x": "6", "y": "19", "roomName": "W5N3" }]

	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

roomTools.createConstructionContainer = function() {

	var positions =

		[{ "x": "25", "y": "6", "roomName": "W5N3" }, { "x": "12", "y": "19", "roomName": "W5N3" }]

	this.createConstructionSite(positions, STRUCTURE_CONTAINER);
}

roomTools.removeConstructionSite = function() {

	var positions =
	 
	[{"x":"12","y":"19","roomName":"W5N3"}]

	if (positions.length > 0) {

		for (var index in positions) {

			var sites = room.find(FIND_CONSTRUCTION_SITES, {
				filter: (site) => site.pos.x == positions[index].x &&
					site.pos.y == positions[index].y
			});

			if (sites) {

				for (site of sites) {

					var result = site.remove();
					debug.highlight("removed construction site:", result);
				}
			}
		}
	}
}

roomTools.destroyStructure = function() {

	var positions =

		[{ "x": "16", "y": "3", "roomName": "W5N3" }, { "x": "16", "y": "2", "roomName": "W5N3" }]

	if (positions.length > 0) {

		for (var index in positions) {

			var structures = room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.pos.x == positions[index].x &&
					structure.pos.y == positions[index].y
			});

			if (structures) {

				for (structure of structures) {

					var result = structure.destroy();
					debug.highlight("destroyed structure site:", result);
				}
			}
		}
	}
}

roomTools.lookAt = function() {

	var positions =
		[{ "x": "16", "y": "15", "roomName": "W5N3" }]

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

	var path = global.room.findPath(pathToObject.pos, pathFromObject.pos, { ignoreCreeps: true });

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
		global.room.visual.circle(location, { radius: 1 / 2, fill: "danger" });
		// global.room.visual.rect(0, 0, location, .60, .60, {fill:"#777"})
	}
	// global.room.visual.circle(global.spawn.pos.x + 5, global.spawn.pos.y + 5, {radius:.30,fill:"danger"});
}


module.exports = roomTools;