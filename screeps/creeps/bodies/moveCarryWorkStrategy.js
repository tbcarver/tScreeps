
var bodyPartsTools = require("./bodyPartsTools");

var moveCarryWorkStrategy = {};

moveCarryWorkStrategy.getBodyPartsObject = function(spawnCapacity) {

	if (spawnCapacity >= 300) {

		var balanced50100MoveParts = {
			maxNumberOf50s: 10,
			maxNumberOf100s: 5,
		}

		balanced50100MoveParts = bodyPartsTools.balance50100MoveParts(balanced50100MoveParts, spawnCapacity);

		var bodyPartsObject = {
			move: balanced50100MoveParts.numberOfMoves,
			work: balanced50100MoveParts.numberOf100s,
			carry: balanced50100MoveParts.numberOf50s,
		};
	}

	return bodyPartsObject
}


module.exports = moveCarryWorkStrategy;