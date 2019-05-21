// NOTE: Interface based on chalk

function debug(...logs) {

	var message = buildMessage(logs);

	console.log(message);
}

debug.primary = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "#6fbbef");

	console.log(message);
}

debug.secondary = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "#6c757d");

	console.log(message);
}

debug.warning = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "orange");

	console.log(message);
}

debug.danger = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "red");

	console.log(message);
}

debug.highlight = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "yellow");

	console.log(message);
}

debug.temp = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "white");
	message = `<span style='font-weight:bold'>${message}</span>`;

	console.log(message);
}

debug.muted = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "#6c757d");

	console.log(message);
}

function buildMessage(logs) {

	var message = "";

	for (var log of logs) {

		if (typeof log === "object") {

			log = JSON.stringify(log, logStringifyReplacer);
			log = log.replace(/"/g, "");
		}

		message += log + " ";
	}

	return message;
}

function logStringifyReplacer(key, value) {

	var replacedValue = value;

	if (typeof value === "object" && key === "room") {

		replacedValue = undefined;

	} else if (typeof value === "number" || Date.prototype.isPrototypeOf(value)) {

		replacedValue = value.toLocaleString("en-US");
	}

	return replacedValue;
}

function buildColor(message, color) {

	return `<span style='color:${color}'>${message}</span>`
}

module.exports = debug;