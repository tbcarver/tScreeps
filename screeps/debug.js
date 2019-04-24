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

debug.highlight = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "highlight");

	console.log(message);
}

debug.danger = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "danger");

	console.log(message);
}

debug.gray = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "#b3b3b3");

	console.log(message);
}

function buildMessage(logs) {

	var message = "";

	for (var log of logs) {

		if (typeof log === "object") {

			log = JSON.stringify(log);
		}

		message += log + " ";
	}

	return message;
}

function buildColor(message, color) {

	return `<span style='color:${color}'>${message}</span>`
}

module.exports = debug;