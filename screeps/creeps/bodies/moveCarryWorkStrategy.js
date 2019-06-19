
var bodyPartsTools = require("./bodyPartsTools");

var moveCarryWorkStrategy = {};

moveCarryWorkStrategy.getBodyPartsObject = function(spawnCapacity, partsPerMove) {
	
	var bodyPartsObject = {
		move: 1,
		work: 1,
		carry: 2,
	};

	if (partsPerMove === 1) {
		bodyPartsObject = {
			move: 2,
			work: 1,
			carry: 1,
		};
	}

	if (spawnCapacity >= 350) {

		balanced50100MoveParts = bodyPartsTools.balance50100MoveParts(null, spawnCapacity, partsPerMove);

		bodyPartsObject = {
			move: balanced50100MoveParts.numberOfMoves,
			work: balanced50100MoveParts.numberOf100s,
			carry: balanced50100MoveParts.numberOf50s,
		};
	}

	return bodyPartsObject
}


module.exports = moveCarryWorkStrategy;