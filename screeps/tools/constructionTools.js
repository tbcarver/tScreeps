

var constructionTools = {};

constructionTools.createConstructionRoad = function() {

	var positions =

	[{"x":"16","y":"5","roomName":"W6S2"},{"x":"15","y":"5","roomName":"W6S2"},{"x":"15","y":"6","roomName":"W6S2"},{"x":"14","y":"6","roomName":"W6S2"},{"x":"14","y":"5","roomName":"W6S2"},{"x":"13","y":"5","roomName":"W6S2"},{"x":"12","y":"5","roomName":"W6S2"},{"x":"11","y":"5","roomName":"W6S2"},{"x":"10","y":"6","roomName":"W6S2"},{"x":"9","y":"7","roomName":"W6S2"},{"x":"9","y":"8","roomName":"W6S2"},{"x":"8","y":"8","roomName":"W6S2"},{"x":"7","y":"9","roomName":"W6S2"},{"x":"7","y":"10","roomName":"W6S2"},{"x":"6","y":"10","roomName":"W6S2"},{"x":"5","y":"11","roomName":"W6S2"},{"x":"4","y":"12","roomName":"W6S2"},{"x":"4","y":"13","roomName":"W6S2"},{"x":"4","y":"14","roomName":"W6S2"},{"x":"4","y":"15","roomName":"W6S2"},{"x":"4","y":"16","roomName":"W6S2"},{"x":"4","y":"17","roomName":"W6S2"},{"x":"4","y":"18","roomName":"W6S2"},{"x":"4","y":"19","roomName":"W6S2"},{"x":"4","y":"20","roomName":"W6S2"}]
	
	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

constructionTools.createConstructionExtension = function() {

	var positions =


[{"x":"25","y":"41","roomName":"W7S0"},{"x":"25","y":"40","roomName":"W7S0"},{"x":"27","y":"41","roomName":"W7S0"},{"x":"27","y":"40","roomName":"W7S0"},{"x":"29","y":"41","roomName":"W7S0"},{"x":"29","y":"40","roomName":"W7S0"},{"x":"23","y":"41","roomName":"W7S0"},{"x":"23","y":"40","roomName":"W7S0"}]

	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

constructionTools.createConstructionContainer = function() {

	var positions =

	[{"x":"26","y":"36","roomName":"W7S1"},{"x":"27","y":"35","roomName":"W7S1"}]

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


	[{"x":"35","y":"48","roomName":"W6N0"},{"x":"35","y":"47","roomName":"W6N0"},{"x":"35","y":"46","roomName":"W6N0"},{"x":"35","y":"45","roomName":"W6N0"},{"x":"35","y":"44","roomName":"W6N0"},{"x":"35","y":"43","roomName":"W6N0"},{"x":"35","y":"42","roomName":"W6N0"},{"x":"35","y":"41","roomName":"W6N0"},{"x":"35","y":"40","roomName":"W6N0"},{"x":"35","y":"39","roomName":"W6N0"},{"x":"35","y":"38","roomName":"W6N0"},{"x":"35","y":"37","roomName":"W6N0"},{"x":"35","y":"36","roomName":"W6N0"},{"x":"35","y":"35","roomName":"W6N0"},{"x":"35","y":"34","roomName":"W6N0"},{"x":"35","y":"33","roomName":"W6N0"},{"x":"35","y":"32","roomName":"W6N0"},{"x":"44","y":"23","roomName":"W6N0"},{"x":"45","y":"23","roomName":"W6N0"},{"x":"46","y":"23","roomName":"W6N0"},{"x":"47","y":"28","roomName":"W6N0"},{"x":"47","y":"27","roomName":"W6N0"},{"x":"47","y":"26","roomName":"W6N0"},{"x":"47","y":"25","roomName":"W6N0"},{"x":"47","y":"24","roomName":"W6N0"},{"x":"47","y":"23","roomName":"W6N0"},{"x":"47","y":"38","roomName":"W6N0"},{"x":"47","y":"39","roomName":"W6N0"},{"x":"47","y":"40","roomName":"W6N0"},{"x":"47","y":"41","roomName":"W6N0"},{"x":"47","y":"42","roomName":"W6N0"},{"x":"47","y":"43","roomName":"W6N0"},{"x":"47","y":"44","roomName":"W6N0"}]

	this.createConstructionSite(positions, STRUCTURE_WALL);
}

constructionTools.createConstructionRamparts = function() {

	var positions =

	[{"x":"35","y":"34","roomName":"W6N0"}]

	this.createConstructionSite(positions, STRUCTURE_RAMPART);
}

constructionTools.createConstructionTower = function() {

	var positions =

	
[{"x":"33","y":"46","roomName":"W7S0"}]

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

				debug.danger(`Cannot get room from Game.rooms`);
			}
		}
	}
}

constructionTools.removeConstructionSite = function() {

	var positions =

	[{"x":"35","y":"34","roomName":"W6N0"}]

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

	[{"x":"21","y":"1","roomName":"W6S2"},{"x":"22","y":"1","roomName":"W6S2"},{"x":"20","y":"2","roomName":"W6S2"},{"x":"21","y":"2","roomName":"W6S2"},{"x":"20","y":"3","roomName":"W6S2"},{"x":"19","y":"3","roomName":"W6S2"}]

	if (positions.length > 0) {

		for (var index in positions) {
			
			var room = Game.rooms[positions[index].roomName];
			var structures = room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.pos.x == positions[index].x &&
					structure.pos.y == positions[index].y
			});

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