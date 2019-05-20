
var bodyPartsTools = require("./bodyPartsTools");

var moveCarryWorkStrategy = {};

moveCarryWorkStrategy.getBodyPartsObject = function(spawnCapacity) {
	
	var bodyPartsObject = {
		move: 1,
		work: 1,
		carry: 2,
	};

	if (spawnCapacity >= 300) {

		balanced50100MoveParts = bodyPartsTools.balance50100MoveParts(null, spawnCapacity);

		bodyPartsObject = {
			move: balanced50100MoveParts.numberOfMoves,
			work: balanced50100MoveParts.numberOf100s,
			carry: balanced50100MoveParts.numberOf50s,
		};
	}

	return bodyPartsObject
}


module.exports = moveCarryWorkStrategy;