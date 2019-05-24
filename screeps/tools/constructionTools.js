

var constructionTools = {};

constructionTools.createConstructionRoad = function() {

	var positions =

	
[{"x":"31","y":"42","roomName":"W7S0"},{"x":"42","y":"8","roomName":"W7S0"},{"x":"42","y":"9","roomName":"W7S0"},{"x":"31","y":"43","roomName":"W7S0"},{"x":"39","y":"31","roomName":"W6N0"},{"x":"40","y":"30","roomName":"W6N0"},{"x":"43","y":"27","roomName":"W6N0"},{"x":"44","y":"26","roomName":"W6N0"}]

	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

constructionTools.createConstructionExtension = function() {

	var positions =


	[{"x":"34","y":"22","roomName":"W6S0"},{"x":"35","y":"22","roomName":"W6S0"},{"x":"36","y":"22","roomName":"W6S0"},{"x":"34","y":"24","roomName":"W6S0"},{"x":"35","y":"24","roomName":"W6S0"},{"x":"36","y":"24","roomName":"W6S0"},{"x":"34","y":"26","roomName":"W6S0"},{"x":"35","y":"26","roomName":"W6S0"},{"x":"36","y":"26","roomName":"W6S0"}]
	
	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

constructionTools.createConstructionContainer = function() {

	var positions =

	[{"x":"31","y":"42","roomName":"W7S0"},{"x":"42","y":"8","roomName":"W7S0"},{"x":"42","y":"9","roomName":"W7S0"},{"x":"31","y":"43","roomName":"W7S0"}]

	this.createConstructionSite(positions, STRUCTURE_CONTAINER);
}

constructionTools.createConstructionStorage = function() {

	var positions =

		
[{"x":"34","y":"12","roomName":"W6S1"}]

	this.createConstructionSite(positions, STRUCTURE_STORAGE);
}

constructionTools.createConstructionSpawn = function() {

	var positions =

		

[{"x":"29","y":"24","roomName":"W6S0"}]

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

	[{"x":"27","y":"24","roomName":"W6S0"}]

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

	[{"x":"23","y":"30","roomName":"W6S0"},{"x":"23","y":"31","roomName":"W6S0"}]

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