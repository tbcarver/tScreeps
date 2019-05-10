
var energyWorkerBodyPartsStrategy = {};

energyWorkerBodyPartsStrategy.getBodyPartsObject = function(spawnCapacity) {

	var bodyPartsObject = {
		move: 1,
		work: 1,
		carry: 1,
	};

	var numberOf50s = Math.floor(spawnCapacity / 50);
	var numberOf100s = Math.floor(numberOf50s / 2);
	numberOf50s = numberOf50s - (numberOf100s * 2);

	var movesNeeded = Math.ceil((numberOf100s + numberOf50s) / 2);

	if (spawnCapacity >= 300 && spawnCapacity < 400) {

		bodyPartsObject.work = numberOf100s - 1;
		bodyPartsObject.carry = 1 + (numberOf50s * 1);

	} else if (spawnCapacity >= 400) {

		bodyPartsObject.work = numberOf100s - 2;
		bodyPartsObject.carry = 2 + (numberOf50s * 1);
		bodyPartsObject.move = 2;
	}

	return bodyPartsObject
}


module.exports = energyWorkerBodyPartsStrategy;