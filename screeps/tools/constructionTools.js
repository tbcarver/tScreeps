

var constructionTools = {};

constructionTools.createConstructionRoad = function() {

	var positions =

	
[{"x":"8","y":"45","roomName":"W7S0"},{"x":"9","y":"45","roomName":"W7S0"},{"x":"10","y":"45","roomName":"W7S0"},{"x":"11","y":"45","roomName":"W7S0"},{"x":"12","y":"45","roomName":"W7S0"},{"x":"13","y":"45","roomName":"W7S0"},{"x":"14","y":"45","roomName":"W7S0"},{"x":"15","y":"45","roomName":"W7S0"},{"x":"16","y":"45","roomName":"W7S0"},{"x":"17","y":"45","roomName":"W7S0"},{"x":"18","y":"45","roomName":"W7S0"},{"x":"19","y":"45","roomName":"W7S0"},{"x":"20","y":"45","roomName":"W7S0"},{"x":"20","y":"44","roomName":"W7S0"},{"x":"21","y":"44","roomName":"W7S0"},{"x":"22","y":"44","roomName":"W7S0"},{"x":"23","y":"44","roomName":"W7S0"},{"x":"24","y":"44","roomName":"W7S0"},{"x":"25","y":"44","roomName":"W7S0"},{"x":"24","y":"45","roomName":"W7S0"},{"x":"23","y":"45","roomName":"W7S0"},{"x":"22","y":"45","roomName":"W7S0"},{"x":"21","y":"45","roomName":"W7S0"},{"x":"25","y":"45","roomName":"W7S0"},{"x":"26","y":"45","roomName":"W7S0"},{"x":"27","y":"45","roomName":"W7S0"},{"x":"28","y":"45","roomName":"W7S0"},{"x":"29","y":"45","roomName":"W7S0"},{"x":"30","y":"45","roomName":"W7S0"},{"x":"31","y":"45","roomName":"W7S0"},{"x":"32","y":"45","roomName":"W7S0"},{"x":"33","y":"45","roomName":"W7S0"},{"x":"34","y":"45","roomName":"W7S0"},{"x":"35","y":"45","roomName":"W7S0"},{"x":"36","y":"44","roomName":"W7S0"},{"x":"37","y":"43","roomName":"W7S0"},{"x":"38","y":"42","roomName":"W7S0"},{"x":"39","y":"41","roomName":"W7S0"},{"x":"39","y":"40","roomName":"W7S0"},{"x":"40","y":"40","roomName":"W7S0"},{"x":"40","y":"39","roomName":"W7S0"},{"x":"41","y":"39","roomName":"W7S0"},{"x":"41","y":"38","roomName":"W7S0"},{"x":"42","y":"38","roomName":"W7S0"},{"x":"42","y":"37","roomName":"W7S0"},{"x":"43","y":"37","roomName":"W7S0"},{"x":"49","y":"17","roomName":"W7S0"},{"x":"48","y":"16","roomName":"W7S0"},{"x":"47","y":"15","roomName":"W7S0"},{"x":"46","y":"14","roomName":"W7S0"},{"x":"45","y":"13","roomName":"W7S0"},{"x":"44","y":"12","roomName":"W7S0"},{"x":"44","y":"13","roomName":"W7S0"},{"x":"45","y":"14","roomName":"W7S0"},{"x":"46","y":"15","roomName":"W7S0"},{"x":"47","y":"16","roomName":"W7S0"},{"x":"48","y":"17","roomName":"W7S0"},{"x":"49","y":"18","roomName":"W7S0"}]

	
	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

constructionTools.createConstructionExtension = function() {

	var positions =


	[{"x":"34","y":"22","roomName":"W6S0"},{"x":"35","y":"22","roomName":"W6S0"},{"x":"36","y":"22","roomName":"W6S0"},{"x":"34","y":"24","roomName":"W6S0"},{"x":"35","y":"24","roomName":"W6S0"},{"x":"36","y":"24","roomName":"W6S0"},{"x":"34","y":"26","roomName":"W6S0"},{"x":"35","y":"26","roomName":"W6S0"},{"x":"36","y":"26","roomName":"W6S0"}]
	
	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

constructionTools.createConstructionContainer = function() {

	var positions =

	[{"x":"43","y":"28","roomName":"W6N0"},{"x":"39","y":"32","roomName":"W6N0"}]

	this.createConstructionSite(positions, STRUCTURE_CONTAINER);
}

constructionTools.createConstructionStorage = function() {

	var positions =

		
[{"x":"34","y":"12","roomName":"W6S1"}]

	this.createConstructionSite(positions, STRUCTURE_STORAGE);
}

constructionTools.createConstructionSpawn = function() {

	var positions =

		

	[{"x":"36","y":"45","roomName":"W7S0"}]

	this.createConstructionSite(positions, STRUCTURE_SPAWN);
}

constructionTools.createConstructionWalls = function() {

	var positions =

		[{ "x": "29", "y": "42", "roomName": "W6S0" }]

	this.createConstructionSite(positions, STRUCTURE_WALL);
}

constructionTools.createConstructionRamparts = function() {

	var positions =

	[{"x":"23","y":"30","roomName":"W6S0"},{"x":"23","y":"31","roomName":"W6S0"},{"x":"31","y":"42","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_RAMPART);
}

constructionTools.createConstructionTower = function() {

	var positions =

	[{"x":"36","y":"8","roomName":"W6S1"}]

	this.createConstructionSite(positions, STRUCTURE_TOWER);
}

constructionTools.createConstructionSite = function(positions, structureType, name) {

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);
			var room = Game.rooms[positions[index].roomName];

			if (room) {

				var result = room.createConstructionSite(position, structureType, name);
				debug.highlight(`created construction site: type: ${structureType}: ${result}`);

			} else {

				debug.error(`Cannot get room from Game.rooms`);
			}
		}
	}
}

constructionTools.removeConstructionSite = function() {

	var positions =

	[{"x":"30","y":"42","roomName":"W6S0"}]

	if (positions.length > 0) {

		for (var index in positions) {

			var room = Game.rooms[positions[index].roomName];
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

constructionTools.destroyStructure = function() {

	var positions =

	[{"x":"35","y":"8","roomName":"W6S1"}]

	if (positions.length > 0) {

		for (var index in positions) {
			
			var room = Game.rooms[positions[index].roomName];
			var structures = room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.pos.x == positions[index].x &&
					structure.pos.y == positions[index].y
			});

			debug.temp("walls",structures);

			if (structures.length > 0) {

				for (structure of structures) {

					var result = structure.destroy();
					debug.highlight("destroyed structure site:", result);
				}
			}
		}
	}
}


module.exports = constructionTools;