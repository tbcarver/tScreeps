
var dropperBodyPartsStrategy = {};

dropperBodyPartsStrategy.getBodyPartsObject = function(spawnCapacity) {

	var numberOf100s = Math.floor(spawnCapacity / 100);
	var numberOf50s = spawnCapacity >= (numberOf100s * 100) + 50 ? 1 : 0;

	var bodyPartsObject = {
		move: 1,
		work: (numberOf50s === 1) ? numberOf100s : numberOf100s - 1,
	};

	return bodyPartsObject
}


module.exports = dropperBodyPartsStrategy;