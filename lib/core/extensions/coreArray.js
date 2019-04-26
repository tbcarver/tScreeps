
var coreArray = {}

coreArray.incrementArrayIndex = function(targetArray, currentIndex) {

	currentIndex++

	if (currentIndex >= targetArray.length) {

		currentIndex = 0;
	}

	return currentIndex;
}

module.exports = coreArray;