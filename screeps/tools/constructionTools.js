

var constructionTools = {};

constructionTools.createConstructionRoad = function() {

	var positions =


	[{"x":"38","y":"23","roomName":"W1N12"},{"x":"38","y":"22","roomName":"W1N12"},{"x":"38","y":"21","roomName":"W1N12"},{"x":"38","y":"20","roomName":"W1N12"},{"x":"38","y":"19","roomName":"W1N12"},{"x":"38","y":"18","roomName":"W1N12"},{"x":"38","y":"17","roomName":"W1N12"},{"x":"38","y":"16","roomName":"W1N12"},{"x":"38","y":"15","roomName":"W1N12"},{"x":"38","y":"14","roomName":"W1N12"},{"x":"38","y":"13","roomName":"W1N12"},{"x":"38","y":"12","roomName":"W1N12"},{"x":"38","y":"11","roomName":"W1N12"},{"x":"38","y":"10","roomName":"W1N12"},{"x":"39","y":"10","roomName":"W1N12"},{"x":"40","y":"10","roomName":"W1N12"}]

	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

constructionTools.createConstructionExtension = function() {

	var positions =

	[{"x":"41","y":"36","roomName":"W6S0"},{"x":"41","y":"37","roomName":"W6S0"},{"x":"41","y":"38","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

constructionTools.createConstructionContainer = function() {

	var positions =

[{"x":"37","y":"22","roomName":"W1N12"}]

	this.createConstructionSite(positions, STRUCTURE_CONTAINER);
}

constructionTools.createConstructionStorage = function() {

	var positions =

		
[{"x":"36","y":"11","roomName":"W6S1"}]

	this.createConstructionSite(positions, STRUCTURE_STORAGE);
}

constructionTools.createConstructionWalls = function() {

	var positions =

		[{ "x": "29", "y": "42", "roomName": "W6S0" }]

	this.createConstructionSite(positions, STRUCTURE_WALL);
}

constructionTools.createConstructionRamparts = function() {

	var positions =

	[{"x":"31","y":"42","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_RAMPART);
}

constructionTools.createConstructionTower = function() {

	var positions =

		[{ "x": "34", "y": "8", "roomName": "W6S1" }]

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


	[{"x":"27","y":"1","roomName":"W6S1"},{"x":"27","y":"2","roomName":"W6S1"},{"x":"28","y":"3","roomName":"W6S1"},{"x":"31","y":"6","roomName":"W6S1"},{"x":"32","y":"7","roomName":"W6S1"},{"x":"33","y":"8","roomName":"W6S1"}]

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