
var bodyPartsTools = require("./bodyPartsTools");

var workDropperStrategy = {};

workDropperStrategy.getBodyPartsObject = function(spawnCapacity) {
	
	var balanced50100MoveParts = {
		maxNumberOf50s: 0,
	}

	balanced50100MoveParts = bodyPartsTools.balance50100MoveParts(balanced50100MoveParts, spawnCapacity);

	var bodyPartsObject = {
		move: balanced50100MoveParts.numberOfMoves,
		work: balanced50100MoveParts.numberOf100s,
	};

	return bodyPartsObject
}


module.exports = workDropperStrategy;