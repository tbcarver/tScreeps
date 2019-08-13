// NOTE: Interface based on chalk
var prettyString = require("./prettyString");

function debug(...logs) {

	var message = prettyString.toPrettyString(logs);

	console.log(message);
}

debug.primary = function(...logs) {

	var message = prettyString.toPrettyString(logs);
	message = buildColor(message, "#6fbbef");

	console.log(message);
}

debug.secondary = function(...logs) {

	var message = prettyString.toPrettyString(logs);
	message = buildColor(message, "#6c757d");

	console.log(message);
}

debug.warning = function(...logs) {

	var message = prettyString.toPrettyString(logs);
	message = buildColor(message, "orange");

	console.log(message);
}

debug.danger = function(...logs) {

	var message = prettyString.toPrettyString(logs);
	message = buildColor(message, "red");

	console.log(message);
}

debug.highlight = function(...logs) {

	var message = prettyString.toPrettyString(logs);
	message = buildColor(message, "yellow");

	console.log(message);
}

debug.muted = function(...logs) {

	var message = prettyString.toPrettyString(logs);
	message = buildColor(message, "#6c757d");

	console.log(message);
}

debug.temp = function(...logs) {

	var message = prettyString.toPrettyString(logs);
	message = buildColor(message, "white");
	message = `<span style='font-weight:bold'>${message}</span>`;

	console.log(message);
}

debug.creep = function(creep, creepName, ...logs) {

	if (creep.name === creepName) {

		var message = prettyString.toPrettyString(logs);
		message = buildColor(message, "white");
		message = `<span style='font-weight:bold'>${message}</span>`;
	
		console.log(message);
	}
}

function buildColor(message, color) {

	return `<span style='color:${color}'>${message}</span>`
}

module.exports = debug;