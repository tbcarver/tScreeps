
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


module.exports = bodyPartsFactory;