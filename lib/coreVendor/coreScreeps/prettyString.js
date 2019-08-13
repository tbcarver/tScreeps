
var prettyString = {};

prettyString.toPrettyString = function(value) {

	var string = "";

	if (Array.isArray(value)) {

		for (var item of value) {
			string += toString(item) + " ";
		}
		
	} else {

		string = toString(value);
	}

	return string;
}

function toString(value) {

	if (typeof value === "object") {

		value = JSON.stringify(value, stringReplacer);
		value = value.replace(/",/g, ", ");
		value = value.replace(/"/g, "")
		value = value.replace(/:([^ ])/g, ": $1");

	} else if (typeof value === "number" || Date.prototype.isPrototypeOf(value)) {

		value = value.toLocaleString("en-US");
	}

	return value;
}

function stringReplacer(key, value) {

	var replacedValue = value;

	if (typeof value === "object" && key === "room") {

		replacedValue = undefined;

	} else if (typeof value === "number" || Date.prototype.isPrototypeOf(value)) {

		replacedValue = value.toLocaleString("en-US");
	}

	return replacedValue;
}


module.exports = prettyString;