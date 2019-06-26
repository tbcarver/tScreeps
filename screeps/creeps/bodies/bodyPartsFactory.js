
var attackerStrategy = require("./attackerStrategy");
var claimerStrategy = require("./claimerStrategy");
var defenderStrategy = require("./defenderStrategy");
var healerStrategy = require("./healerStrategy");
var healerToughStrategy = require("./healerToughStrategy");
var moveCarryStrategy = require("./moveCarryStrategy");
var moveCarryWorkStrategy = require("./moveCarryWorkStrategy");
var moveStrategy = require("./moveStrategy");
var moveWorkStrategy = require("./moveWorkStrategy");
var rangedAttackerStrategy = require("./rangedAttackerStrategy");

var bodyPartsFactory = {};
var bodyPartsStrategies = {
	attacker: attackerStrategy,
	claimer: claimerStrategy,
	defender: defenderStrategy,
	healer: healerStrategy,
	healerTough: healerToughStrategy,
	moveCarry: moveCarryStrategy,
	moveCarryWork: moveCarryWorkStrategy,
	move: moveStrategy,
	moveWork: moveWorkStrategy,
	rangedAttacker: rangedAttackerStrategy,
}

bodyPartsFactory.getBodyParts = function(bodyPartsStrategyName, spawnCapacity, partsPerMove) {

	var bodyPartsStrategy = bodyPartsStrategies[bodyPartsStrategyName];
	var bodyParts;

	if (bodyPartsStrategy) {

		bodyPartsObject = bodyPartsStrategy.getBodyPartsObject(spawnCapacity, partsPerMove);

		if (bodyPartsObject) {

			bodyParts = this.toBodyParts(bodyPartsObject);
		}
	} else {
		throw new Error("Body part strategy missing for: " + bodyPartsStrategyName);
	}

	return bodyParts;
}

bodyPartsFactory.toBodyParts = function(bodyPartsObject) {

	// NOTE: Order is important. The parts built first are the first to be attacked.

	var bodyParts = [];

	if (bodyPartsObject.tough) {

		_.times(bodyPartsObject.tough, () => bodyParts.push(TOUGH));
	}

	if (bodyPartsObject.claim) {

		_.times(bodyPartsObject.claim, () => bodyParts.push(CLAIM));
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

	if (bodyPartsObject.heal) {

		_.times(bodyPartsObject.heal, () => bodyParts.push(HEAL));
	}

	if (bodyPartsObject.move) {

		_.times(bodyPartsObject.move, () => bodyParts.push(MOVE));
	}

	return bodyParts;
}


module.exports = bodyPartsFactory;