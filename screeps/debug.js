// NOTE: Interface based on chalk

function debug(...logs) {

	var message = buildMessage(logs);

	console.log(message);
}

debug.blue = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "#6fbbef");

	console.log(message);
}

debug.yellow = function(...logs) {

	var message = buildMessage(logs);
	message = buildColor(message, "#dbab79");

	console.log(message);
}

function buildMessage(logs) {

	var message = "";

	for (var log of logs) {

		if (typeof log === "object") {

			log = JSON.stringify(log);
		}

		message += log;
	}

	return message;
}

function buildColor(message, color) {

	return `<span style='color:${color}'>${message}</span>`
}

module.exports = debug;