
var energizerBodyPartsStrategy = {};

energizerBodyPartsStrategy.getBodyPartsObject = function(spawnCapacity) {

	var balanced50100MoveParts = balance50100MoveParts(null, spawnCapacity);

	var bodyPartsObject = {
		move: balanced50100MoveParts.numberOfMoves,
		work: balanced50100MoveParts.numberOf100s,
		carry: balanced50100MoveParts.numberOf50s,
	};

	return bodyPartsObject
}

function balance50100MoveParts(result, spawnCapacity) {

	if (result) {

		result.numberOf50s = result.numberOf50sLeft;

	} else {

		var total50s = Math.floor(spawnCapacity / 50);

		result = {
			spawnCapacity: spawnCapacity,
			total50s: total50s,
			numberOf100s: 0,
			numberOf50s: total50s,
			numberOfMoves: 0,
			numberOf50sLeft: 0,
			numberOf50sUnused: 0,
			foundOneUnused: false,
			success: false
		}
	}

	result.numberOf100s = Math.floor(result.numberOf50s / 4);
	result.numberOf50s = result.numberOf50s - (result.numberOf100s * 2);

	result.numberOfMoves = Math.ceil((result.numberOf100s + result.numberOf50s) / 2);
	result.numberOf50sLeft = result.total50s - result.numberOfMoves;
	result.numberOf50sUnused = result.total50s - (result.numberOf100s * 2) - result.numberOf50s - result.numberOfMoves;

	if (result.numberOf50sUnused === 0) {

		result.success = true;

	} else if (result.numberOf50sUnused === 1 || result.numberOf50sUnused === -1) {

		if (result.foundOneUnused) {

			if (result.numberOf50sUnused === 1) {
				result.success = true;
			}
		} else {
			result.foundOneUnused = true;
		}
	}

	if (!result.success) {
		result = balance50100MoveParts(result);
	}

	return result;
}


module.exports = energizerBodyPartsStrategy;