

var debug = require("../debug");
var roomTools = {};

roomTools.createConstructionRoad = function() {

	var positions =

	[{"x":"33","y":"15","roomName":"W6S0"},{"x":"34","y":"15","roomName":"W6S0"},{"x":"35","y":"15","roomName":"W6S0"},{"x":"34","y":"16","roomName":"W6S0"},{"x":"33","y":"17","roomName":"W6S0"},{"x":"33","y":"16","roomName":"W6S0"},{"x":"36","y":"15","roomName":"W6S0"},{"x":"36","y":"14","roomName":"W6S0"},{"x":"36","y":"13","roomName":"W6S0"},{"x":"36","y":"12","roomName":"W6S0"},{"x":"35","y":"12","roomName":"W6S0"},{"x":"35","y":"11","roomName":"W6S0"},{"x":"35","y":"10","roomName":"W6S0"},{"x":"36","y":"10","roomName":"W6S0"},{"x":"36","y":"11","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

roomTools.createConstructionExtension = function() {

	var positions =

	
[{"x":"39","y":"36","roomName":"W6S0"},{"x":"39","y":"37","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

roomTools.createConstructionContainer = function() {

	var positions =

		
[{"x":"31","y":"6","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_CONTAINER);
}

roomTools.createConstructionWalls = function() {

	var positions =


	[{"x":"26","y":"8","roomName":"W6S0"},{"x":"26","y":"7","roomName":"W6S0"},{"x":"26","y":"6","roomName":"W6S0"},{"x":"26","y":"5","roomName":"W6S0"},{"x":"26","y":"4","roomName":"W6S0"},{"x":"26","y":"3","roomName":"W6S0"},{"x":"26","y":"2","roomName":"W6S0"},{"x":"36","y":"2","roomName":"W6S0"},{"x":"37","y":"2","roomName":"W6S0"},{"x":"38","y":"2","roomName":"W6S0"},{"x":"39","y":"2","roomName":"W6S0"},{"x":"40","y":"2","roomName":"W6S0"},{"x":"41","y":"2","roomName":"W6S0"},{"x":"42","y":"2","roomName":"W6S0"},{"x":"43","y":"2","roomName":"W6S0"},{"x":"44","y":"2","roomName":"W6S0"},{"x":"47","y":"17","roomName":"W6S0"},{"x":"47","y":"16","roomName":"W6S0"},{"x":"47","y":"15","roomName":"W6S0"},{"x":"47","y":"14","roomName":"W6S0"},{"x":"47","y":"13","roomName":"W6S0"},{"x":"47","y":"12","roomName":"W6S0"},{"x":"47","y":"11","roomName":"W6S0"},{"x":"47","y":"10","roomName":"W6S0"},{"x":"47","y":"9","roomName":"W6S0"},{"x":"47","y":"8","roomName":"W6S0"},{"x":"47","y":"7","roomName":"W6S0"}]
	
	this.createConstructionSite(positions, STRUCTURE_WALL);
}

roomTools.createConstructionSite = function(positions, structureType, name) {

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);
			var result = global.room.createConstructionSite(position, structureType, name);
			debug.highlight(`created construction site: type: ${STRUCTURE_ROAD}: ${result}`);
		}
	}
}

roomTools.removeConstructionSite = function() {

	var positions =

	
[{"x":"34","y":"7","roomName":"W6S0"},{"x":"33","y":"7","roomName":"W6S0"},{"x":"33","y":"8","roomName":"W6S0"},{"x":"32","y":"8","roomName":"W6S0"},{"x":"32","y":"9","roomName":"W6S0"},{"x":"31","y":"9","roomName":"W6S0"}]

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

	
[{"x":"3","y":"20","roomName":"W5N3"},{"x":"5","y":"20","roomName":"W5N3"},{"x":"8","y":"23","roomName":"W5N3"},{"x":"8","y":"24","roomName":"W5N3"}]
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
			debug.primary(looked);
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

roomTools.visualizeStructureHealth = function() {

	const targets = global.room.find(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			structure.structureType !== STRUCTURE_WALL
	});

	for (var index in targets) {

		global.room.visual.circle(targets[index].pos, { radius: .3, stroke: "red", fill: "transparent" });
	}
}


module.exports = roomTools;