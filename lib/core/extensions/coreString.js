var coreString = {};

coreString.includes = function(value, search, start) {

	var includes = false;

	if (!start) {

		start = 0;
	}

	if (typeof start !== 'number') {

		throw Error("The start parameter must be a number");
	}

	if (start + search.length <= value.length) {
		
		includes = (value.indexOf(search, start) !== -1);
	}

	return includes;
}

coreString.includesAny = function(values, search, start) {

	var includes = false;

	for (var index = 0; index < values.length; index++) {

		var value = values[index];

		if (coreString.includes(value, search, start)) {

			includes = true;
			break;
		}
	}

	return includes;
};

coreString.compressWhiteSpace = function(value) {

	if (value) {

		value = value.replace(/\s+/g, " ");
	}

	return value;
}

coreString.addNumberInString = function(string, number) {

	var result = string.replace(/\d+/, function(value) {

		var parsedNumber = parseFloat(value);

		if (!isNaN(parsedNumber)) {

			value = parsedNumber + number;
		}

		return value;
	});

	return result;
}


module.exports = coreString