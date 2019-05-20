
var bodyPartsTools = require("./bodyPartsTools");

var moveCarryStrategy = {};

moveCarryStrategy.getBodyPartsObject = function(spawnCapacity) {

	var balanced50100MoveParts = {
		maxNumberOf100s: 0,
	}

	balanced50100MoveParts = bodyPartsTools.balance50100MoveParts(balanced50100MoveParts, spawnCapacity);

	bodyPartsObject = {
		move: balanced50100MoveParts.numberOfMoves,
		carry: balanced50100MoveParts.numberOf50s,
	};

	return bodyPartsObject
}


module.exports = moveCarryStrategy;