// Thanks to kamyl @stackoverflow: Screeps: How do I set up source map using TypeScript and Webpack?

// @ts-ignore
var rawSourceMap = require('main.js.map');
var { SourceMapConsumer } = require('source-map');

// NOTE: Keep in global scope because of high CPU usage.
const consumer = new SourceMapConsumer(rawSourceMap);	

var sourceMap = {};

sourceMap.logStackTrace = function(error) {

	try {

		const errorMessage = getSourceMapStackTrace(error);
		console.log(`<span style="color: tomato">${errorMessage}</span>`);

	} catch (sourceMapError) {

		console.log(`<span style="color: tomato">source map failed: ${error}</span>`);
	}
}

function getSourceMapStackTrace(error) {
	const originalStackTrace = error instanceof Error ? error.stack : error;

	const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
	let match;
	let outputStackTrace = error.toString();

	while ((match = re.exec(originalStackTrace)) !== null) {

		var nameFromOriginalStackTrace = match[1];
		const isStackTraceLineControlledByMe = match[2] === 'main';
		const lineFromOriginalStackTrace = parseInt(match[3], 10);
		const columnFromOriginalStackTrace = parseInt(match[4], 10);

		nameFromOriginalStackTrace = nameFromOriginalStackTrace.replace("Object.", "");
		nameFromOriginalStackTrace = nameFromOriginalStackTrace.replace("module.exports.", "");

		if (nameFromOriginalStackTrace.includes("__webpack_require__") || nameFromOriginalStackTrace.includes("exports.getArg")) {
			break;
		}

		if (!isStackTraceLineControlledByMe) {
			break;
		}

		const { name, source, line, column } = consumer.originalPositionFor({
			column: columnFromOriginalStackTrace,
			line: lineFromOriginalStackTrace,
		});

		if (!line) {
			break;
		}

		const finalName = (name) ? name : (nameFromOriginalStackTrace) ? nameFromOriginalStackTrace : '';



		// console.log("match1: " + `${finalName}(${source}:${line}:${column}`)

		outputStackTrace += stripWebpackFromStackTrace(
			`<br>    at ${finalName}(${source}:${line}:${column})`,
		);
	}

	return outputStackTrace;
}

function stripWebpackFromStackTrace(text) {
	return text.replace('webpack:///', '');
}


module.exports = sourceMap;