

var constructionTools = {};

constructionTools.createConstructionRoad = function() {

	var positions =

	[{"x":"31","y":"35","roomName":"W6S0"},{"x":"30","y":"35","roomName":"W6S0"},{"x":"30","y":"36","roomName":"W6S0"},{"x":"30","y":"37","roomName":"W6S0"},{"x":"30","y":"38","roomName":"W6S0"},{"x":"30","y":"39","roomName":"W6S0"},{"x":"31","y":"39","roomName":"W6S0"},{"x":"31","y":"34","roomName":"W6S0"},{"x":"30","y":"33","roomName":"W6S0"},{"x":"30","y":"34","roomName":"W6S0"},{"x":"30","y":"32","roomName":"W6S0"},{"x":"31","y":"33","roomName":"W6S0"}]
	
	this.createConstructionSite(positions, STRUCTURE_ROAD);
}

constructionTools.createConstructionExtension = function() {

	var positions =

	[{"x":"31","y":"36","roomName":"W6S0"},{"x":"31","y":"37","roomName":"W6S0"},{"x":"31","y":"38","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_EXTENSION);
}

constructionTools.createConstructionContainer = function() {

	var positions =


	[{"x":"33","y":"32","roomName":"W6S0"}]

	this.createConstructionSite(positions, STRUCTURE_CONTAINER);
}

constructionTools.createConstructionWalls = function() {

	var positions =

	[{"x":"29","y":"42","roomName":"W6S0"}]

		this.createConstructionSite(positions, STRUCTURE_WALL);
}

constructionTools.createConstructionSite = function(positions, structureType, name) {

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);
			var result = room.createConstructionSite(position, structureType, name);
			debug.highlight(`created construction site: type: ${STRUCTURE_ROAD}: ${result}`);
		}
	}
}

constructionTools.removeConstructionSite = function() {

	var positions =


	[{"x":"26","y":"26","roomName":"W6S0"},{"x":"26","y":"25","roomName":"W6S0"},{"x":"26","y":"27","roomName":"W6S0"}]

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

	[{"x":"33","y":"32","roomName":"W6S0"}]

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


module.exports = constructionTools;