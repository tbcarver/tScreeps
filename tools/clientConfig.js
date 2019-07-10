
var fs = require('fs');
var path = require('path');

(async function() {

	try {

		const { ScreepsAPI } = require('screeps-api');

		const api = new ScreepsAPI({
			protocol: 'http',
			hostname: 'screeps-server.codecamp.edu',
			port: 21025,
		});

		await api.auth('carver230620', '5560');
		var result = await api.raw.user.code.get();

		if (result.ok === 1) {

			var clientConfigFile = buildClientConfigFile();
			var main = result.modules["main-original"];

			if (!main) {
				main = result.modules["main"];
				result.modules["main-original"] = main;
			}

			result.modules["main"] = main + clientConfigFile;

			result = await api.raw.user.code.set(undefined, result.modules);

			if (result.ok === 1) {
				console.log("Config set: ", result);
			} else {
				console.log("Code set failed with code: ", result.ok);
			}
		} else {
			console.log("Code get failed with code: ", result.ok);
		}

	} catch (error) {
		console.log(error)
	}

})()

function buildClientConfigFile() {

	var clientConfigFile = "";

	clientConfigFile += readFile("./screeps/creeps/creepsSpawnRules.js");
	clientConfigFile +=
		`
		global.clientConfig = {};

		if (creepsSpawnRules) {
			clientConfig.creepsSpawnRules = creepsSpawnRules;
		}
		`;

	return clientConfigFile;
}

function readFile(pathName) {

	var pathName = path.resolve(pathName);
	var options = { encoding: "utf8" };

	return fs.readFileSync(pathName, options);
}