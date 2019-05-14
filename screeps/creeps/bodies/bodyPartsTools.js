
var bodyPartsTools = {};

bodyPartsTools.balance50100MoveParts = function(result, spawnCapacity) {

	if (result && result.total50s) {

		result.currentTotal50s = result.numberOf50sLeft;
		result.numberOf50s = result.currentTotal50s;

	} else {

		var total50s = Math.floor(spawnCapacity / 50);

		var defaultResult = {
			spawnCapacity: spawnCapacity,
			total50s: total50s,
			currentTotal50s: total50s,
			numberOf50s: total50s,
			maxNumberOf50s: -1,
			numberOf100s: 0,
			maxNumberOf100s: -1,
			numberOfMoves: 0,
			numberOf50sLeft: 0,
			numberOf50sUnused: 0,
			foundOneUnused: false,
			useAnyOne: false,
			success: false
		}

		result = _.merge(defaultResult, result);
	}

	if (result.maxNumberOf50s !== -1 && result.numberOf50s > result.maxNumberOf50s) {
		result.numberOf50s = result.maxNumberOf50s
	}

	result.numberOf100s = Math.floor(result.currentTotal50s / 4);

	if (result.maxNumberOf100s !== -1 && result.numberOf100s > result.maxNumberOf100s) {
		result.numberOf100s = result.maxNumberOf100s
	}

	if (result.maxNumberOf50s !== result.numberOf50s) {
		result.numberOf50s = result.numberOf50s - (result.numberOf100s * 2);
	} else if (result.maxNumberOf100s !== result.numberOf100s) {
		result.numberOf100s = Math.floor((result.currentTotal50s - result.numberOf50s) / 2);
	}

	result.numberOfMoves = Math.ceil((result.numberOf100s + result.numberOf50s) / 2);
	result.numberOf50sLeft = result.total50s - result.numberOfMoves;
	result.numberOf50sUnused = result.total50s - (result.numberOf100s * 2) - result.numberOf50s - result.numberOfMoves;

	if (result.maxNumberOf50s == result.numberOf50s && result.maxNumberOf100s === result.numberOf100s ) {
		result.success = true;
	}

	if (result.numberOf50sUnused === 0) {

		result.success = true;

	} else if (result.numberOf50sUnused === 1 || result.numberOf50sUnused === -1) {

		if (result.foundOneUnused) {

			if (result.useAnyOne) {
				result.success = true;
			}
			else if (result.numberOf50sUnused === 1) {
				result.success = true;
			} else if (!result.useAnyOne) {
				result.useAnyOne = true;
			}
		} else {
			result.foundOneUnused = true;
		}
	}

	if (!result.success) {
		result = this.balance50100MoveParts(result);
	}

	return result;
}

module.exports = bodyPartsTools;