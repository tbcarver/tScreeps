
function debug(...logs) {

	var message = "";

	for (var log of logs) {
		
		if (typeof log === "object") {
			
			log = JSON.stringify(log);
		}
		
		message += log;
	}

	console.log(message)
}

module.exports = debug;