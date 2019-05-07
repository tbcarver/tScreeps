
var energizerBodyPartsStrategy = {};

energizerBodyPartsStrategy.getBodyPartsObject = function(spawnCapacity) {

	var bodyPartsObject = {
		move: 1,
		work: 1,
		carry: 1,
	};

	var numberOf100s = Math.floor(spawnCapacity / 100);
	var numberOf50s = spawnCapacity >= (numberOf100s * 100) + 50 ? 1 : 0;

	if (spawnCapacity < 400) {

		bodyPartsObject.work = numberOf100s - 1;
		bodyPartsObject.carry = 1 + (numberOf50s * 1);

	} else {

		bodyPartsObject.work = numberOf100s - 2;
		bodyPartsObject.carry = 3 + (numberOf50s * 1);

	}

	return bodyPartsObject
}


module.exports = energizerBodyPartsStrategy;