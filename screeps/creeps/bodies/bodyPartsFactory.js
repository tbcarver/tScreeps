
var tools = require("../../tools/tools");
var dropperBodyPartsStrategy = require("./dropperBodyPartsStrategy");
var energizerBodyPartsStrategy = require("./energizerBodyPartsStrategy");
var energyWorkerBodyPartsStrategy = require("./energyWorkerBodyPartsStrategy");

var bodyPartsFactory = {};

bodyPartsFactory.getBodyParts = function(bodyPartsStrategyName) {

	var bodyPartsStrategy;
	var bodyParts;

	switch (bodyPartsStrategyName) {

		case "dropper":
			bodyPartsStrategy = dropperBodyPartsStrategy;
			break;

		case "energizer":
			bodyPartsStrategy = energizerBodyPartsStrategy;
			break;

		case "energyWorker":
			bodyPartsStrategy = energyWorkerBodyPartsStrategy;
			break;
	}

	if (bodyPartsStrategy) {

		var spawnCapacity = tools.spawnTools.calculateSpawnCapacity();
		bodyPartsObject = bodyPartsStrategy.getBodyPartsObject(spawnCapacity);

		if (bodyPartsObject) {

			bodyParts = this.toBodyParts(bodyPartsObject);
		}
	}

	return bodyParts;
}

bodyPartsFactory.toBodyParts = function(bodyPartsObject) {

	var bodyParts = [];

	if (bodyPartsObject.move) {

		_.times(bodyPartsObject.move, () => bodyParts.push(MOVE));
	}

	if (bodyPartsObject.work) {

		_.times(bodyPartsObject.work, () => bodyParts.push(WORK));
	}

	if (bodyPartsObject.carry) {

		_.times(bodyPartsObject.carry, () => bodyParts.push(CARRY));
	}

	if (bodyPartsObject.attack) {

		_.times(bodyPartsObject.attack, () => bodyParts.push(ATTACK));
	}

	if (bodyPartsObject.rangedAttack) {

		_.times(bodyPartsObject.rangedAttack, () => bodyParts.push(RANGED_ATTACK));
	}

	if (bodyPartsObject.tough) {

		_.times(bodyPartsObject.tough, () => bodyParts.push(TOUGH));
	}

	if (bodyPartsObject.heal) {

		_.times(bodyPartsObject.heal, () => bodyParts.push(HEAL));
	}

	if (bodyPartsObject.claim) {

		_.times(bodyPartsObject.claim, () => bodyParts.push(CLAIM));
	}

	return bodyParts;
}

bodyPartsFactory.balance50100MoveParts = function(result) {

	if (result) {

		result.numberOf50s = result.numberOf50sLeft;

	} else {

		var spawnCapacity = spawnTools.calculateSpawnCapacity();
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
		result = approximateParts(result);
	}

	return result;
}


module.exports = bodyPartsFactory;