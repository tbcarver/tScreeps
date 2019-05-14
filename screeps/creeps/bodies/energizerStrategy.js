
var bodyPartsTools = require("./bodyPartsTools");

var energizerStrategy = {};

energizerStrategy.getBodyPartsObject = function(spawnCapacity) {
	
	var balanced50100MoveParts = {
		maxNumberOf50s: 10,
		maxNumberOf100s: 1,
	}

	balanced50100MoveParts = bodyPartsTools.balance50100MoveParts(balanced50100MoveParts, spawnCapacity);

	var bodyPartsObject = {
		move: balanced50100MoveParts.numberOfMoves,
		work: balanced50100MoveParts.numberOf100s,
		carry: balanced50100MoveParts.numberOf50s,
	};

	return bodyPartsObject
}


module.exports = energizerStrategy;