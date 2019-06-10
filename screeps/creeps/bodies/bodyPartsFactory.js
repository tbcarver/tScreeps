
var claimerStrategy = require("./claimerStrategy");
var moveCarryStrategy = require("./moveCarryStrategy");
var moveCarryWorkStrategy = require("./moveCarryWorkStrategy");
var moveStrategy = require("./moveStrategy");
var rangedAttackStrategy = require("./rangedAttackStrategy");
var workDropperStrategy = require("./workDropperStrategy");

var bodyPartsFactory = {};

bodyPartsFactory.getBodyParts = function(bodyPartsStrategyName, spawnCapacity, partsPerMove) {

	var bodyPartsStrategy;
	var bodyParts;

	switch (bodyPartsStrategyName) {

		case "claimer":
			bodyPartsStrategy = claimerStrategy;
			break;

		case "energizer":
			bodyPartsStrategy = moveCarryWorkStrategy;
			break;

		case "moveCarry":
			bodyPartsStrategy = moveCarryStrategy;
			break;

		case "moveCarryWork":
			bodyPartsStrategy = moveCarryWorkStrategy;
			break;

		case "move":
			bodyPartsStrategy = moveStrategy;
			break;

		case "rangedAttack":
			bodyPartsStrategy = rangedAttackStrategy;
			break;

		case "workDropper":
			bodyPartsStrategy = workDropperStrategy;
			break;
	}

	if (bodyPartsStrategy) {

		bodyPartsObject = bodyPartsStrategy.getBodyPartsObject(spawnCapacity, partsPerMove);

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