
var bodyPartsTools = {};

bodyPartsTools.balance50100MoveParts = function(result, spawnCapacity, partsPerMove) {

	if (result && result.total50s) {

		result.currentTotal50s = result.numberOf50sLeft;
		result.numberOf50s = result.currentTotal50s;

	} else {

		var total50s = Math.floor(spawnCapacity / 50);

		var defaultResult = {
			spawnCapacity: spawnCapacity,
			partsPerMove: partsPerMove,
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
			repeating: {
				count: 0,
				previousNumberOf50sUnused: 0,
				lastNumberOf50sUnused: 0,
			},
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

	result.numberOfMoves = Math.ceil((result.numberOf100s + result.numberOf50s) / result.partsPerMove);
	result.numberOf50sLeft = result.total50s - result.numberOfMoves;
	result.numberOf50sUnused = result.total50s - (result.numberOf100s * 2) - result.numberOf50s - result.numberOfMoves;

	if (result.maxNumberOf50s == result.numberOf50s && result.maxNumberOf100s === result.numberOf100s && result.numberOf50sUnused >= 0) {
		result.success = true;
	}

	if (result.repeating.previousNumberOf50sUnused === result.numberOf50sUnused) {
		result.repeating.count++;
	} else {
		result.repeating.count = 0;
	}

	result.repeating.previousNumberOf50sUnused = result.repeating.lastNumberOf50sUnused;
	result.repeating.lastNumberOf50sUnused = result.numberOf50sUnused;

	if (result.numberOf50sUnused === 0) {

		result.success = true;

	} else if (result.repeating.count >= 3) {
		if (result.numberOf50sUnused === 1) {

			result.success = true;

		} else if (result.repeating.count >= 5 && result.numberOf50sUnused < 0) {

			if (result.numberOf50sUnused === -1) {

				if (result.numberOf50s > 1) {
					result.numberOf50s--;
				} else if (result.numberOf100s > 1) {
					result.numberOf100s--;
					if (result.numberOf50s < result.maxNumberOf50s) {
						result.numberOf50s++;
					}
				} else if (result.numberOfMoves > 1) {
					result.numberOfMoves--;
				}
				result.success = true;

			} else if (result.numberOf50sUnused === -2) {

				if (result.numberOf50s > 1) {
					result.numberOf50s--;
					result.numberOfMoves--;
				} else if (result.numberOf100s > 1) {
					result.numberOf100s--;
					result.numberOfMoves--;
				}
				result.success = true;

			} else {

				result.numberOfMoves = Math.ceil(result.total50s - (result.numberOf100s * 2) / result.partsPerMove);
				result.numberOf50s = result.total50s - (result.numberOf100s * 2) - result.numberOfMoves;
				result.success = true;
			}
		}
	}


	if (!result.success) {
		result = this.balance50100MoveParts(result);
	}

	return result;
}

module.exports = bodyPartsTools;