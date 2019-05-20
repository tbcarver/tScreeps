

var constructionTools = {};

constructionTools.createConstructionRoad = function() {

	var positions =

	[{"x":"39","y":"9","roomName":"W6S1"},{"x":"39","y":"10","roomName":"W6S1"}]
		
	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

constructionTools.createConstructionExtension = function() {

	var positions =

		[{ "x": "31", "y": "36", "roomName": "W6S0" }, { "x": "31", "y": "37", "roomName": "W6S0" }, { "x": "31", "y": "38", "roomName": "W6S0" }]

	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

constructionTools.createConstructionContainer = function() {

	var positions =

		[{ "x": "32", "y": "25", "roomName": "W6S0" }, { "x": "31", "y": "9", "roomName": "W6S0" }]

	this.createConstructionSite(positions, STRUCTURE_CONTAINER);
}

constructionTools.createConstructionWalls = function() {

	var positions =

		[{ "x": "29", "y": "42", "roomName": "W6S0" }]

	this.createConstructionSite(positions, STRUCTURE_WALL);
}

constructionTools.createConstructionRamparts = function() {

	var positions =

		[{ "x": "32", "y": "42", "roomName": "W6S0" }]

	this.createConstructionSite(positions, STRUCTURE_RAMPART);
}

constructionTools.createConstructionStorage = function() {

	var positions =

		[{ "x": "32", "y": "19", "roomName": "W6S0" }]

	this.createConstructionSite(positions, STRUCTURE_STORAGE);
}

constructionTools.createConstructionTower = function() {

	var positions =

		[{ "x": "31", "y": "16", "roomName": "W1S0" }]

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

		[{ "x": "29", "y": "29", "roomName": "W6S0" }, { "x": "29", "y": "21", "roomName": "W6S0" }]

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

constructionTools.destroyStructure = function() {

	var positions =


		[{ "x": "32", "y": "42", "roomName": "W6S0" }]

	if (positions.length > 0) {

		for (var index in positions) {

			var structures = room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.pos.x == positions[index].x &&
					structure.pos.y == positions[index].y && structure.structureType === STRUCTURE_WALL
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


module.exports = constructionTools;