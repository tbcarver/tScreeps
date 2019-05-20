

var constructionTools = {};

constructionTools.createConstructionRoad = function() {

	var positions =

	
[{"x":"32","y":"39","roomName":"W6S0"},{"x":"32","y":"40","roomName":"W6S0"},{"x":"32","y":"41","roomName":"W6S0"},{"x":"32","y":"42","roomName":"W6S0"},{"x":"32","y":"43","roomName":"W6S0"},{"x":"28","y":"48","roomName":"W6S0"},{"x":"27","y":"49","roomName":"W6S0"},{"x":"29","y":"47","roomName":"W6S0"},{"x":"30","y":"46","roomName":"W6S0"},{"x":"31","y":"45","roomName":"W6S0"},{"x":"32","y":"44","roomName":"W6S0"}]

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

constructionTools.createConstructionSite = function(positions, structureType, name) {

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);
			var result = room.createConstructionSite(position, structureType, name);
			debug.highlight(`created construction site: type: ${structureType}: ${result}`);
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

		
[{"x":"32","y":"42","roomName":"W6S0"}]

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