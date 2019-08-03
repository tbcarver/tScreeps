
var coreArray = {}

coreArray.incrementArrayIndex = function(targetArray, currentIndex) {

	currentIndex++

	if (currentIndex >= targetArray.length) {

		currentIndex = 0;
	}

	return currentIndex;
}

coreArray.pushValue = function(array, value) {
	
	if (value) {
		array.push(value);
	}
}


module.exports = coreArray;