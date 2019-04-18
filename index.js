

(async function() {

	// You can overwrite parameters if needed

	try {
		
		const { ScreepsAPI } = require('screeps-api');	
	
		const api = new ScreepsAPI({
			protocol: 'http',
			hostname: 'screeps-server.codecamp.edu',
			port: 21025,
		});

		const myRoom = "W5N3";

		// var result = await api.raw.register.submit("testuser", "testuser", "1234");

		await api.auth('carver230620', '5560');

		result = await api.raw.auth.me();
		console.log("me: ", result);
		
		// result = await api.raw.game.placeSpawn("W5N3", 15, 15, "spawn1");
		// console.log(result);

		// result = await api.raw.user.respawn();
		// console.log("respawn: ", result);

		result = await api.raw.user.worldStatus();
		console.log("worldStatus: ", result);
		result = await api.raw.game.roomOverview(myRoom);
		console.log("roomOverview: ", result);
		result = await api.raw.game.roomStatus(myRoom);
		console.log("roomStatus: ", result);

		result = await api.raw.user.memory.get("creeps");
		console.log("memory: ", result);

		

		// var test = await api.auth('screeps@email.com', 'notMyPass')

		// await api.auth('carver230620', '5560');
		// var user = await api.me();		
		// console.log(user)
		// result = await api.raw.auth.me();
		// console.log(result)

		// console.log("done")

		// var result = await api.raw.register.submit("carver2", "carver2", "1234");
		// var result = await api.raw.auth.signin("carver230620", "5560");

		// api.token = result.token;
		// result = await api.raw.auth.me();
		// console.log("me: ", result);
		// result = await api.raw.user.respawn();
		// console.log(result);
		// result = await api.raw.auth.me();
		// console.log(result);


		// result = await api.raw.game.createConstruction("W5N5", 10, 15, "controller", "controller");
		// console.log(result);


		// result = await api.raw.game.placeSpawn("W2N1", 25, 15, "spawn1");
		// console.log(result);



		// result = await api.raw.user.memory.get();
		// console.log(result);

		// result = await api.raw.userMessages.list("389785b81e6d78a");
		// result = await api.raw.auth.me();
		// result = await api.raw.user.branches();
		// result = await api.raw.user.code.get();
		// result = await api.raw.leaderboard.seasons();

		// result = await api.raw.user.worldStatus();
		// console.log("worldStatus: ", result);
		// result = await api.raw.game.roomOverview("W5N3");
		// console.log("roomOverview: ", result);
		// result = await api.raw.game.roomStatus("W5N3");
		// console.log("roomStatus: ", result);


	} catch (error) {
		console.log(error)
	}



})()