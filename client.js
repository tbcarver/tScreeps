

(async function() {

	// You can overwrite parameters if needed

	try {
		
		const { ScreepsAPI } = require('screeps-api');	
	
		const api = new ScreepsAPI({
			protocol: 'http',
			hostname: 'screeps-server.codecamp.edu',
			port: 21025,
		});
		var result;
		// var result = await api.raw.register.submit("mascarenas235720", "mascarenas235720", "1985");
		// console.log("register: ", result);
		// result =await api.auth('mascarenas235720', '1985');
		// console.log("register: ", result);
		// result = await api.raw.user.respawn();
		// console.log("register: ", result);
		// result = await api.raw.game.placeSpawn("W2S1", 39, 14, "spawn1");
		// console.log("spawn: ", result);

		// var result = await api.raw.register.submit("shampton140961", "shampton140961", "6942");
		// console.log("register: ", result);
		// await api.auth('shampton140961', '6942');
		// result = await api.me();		
		// console.log(result)
		// result = await api.raw.user.respawn();
		// console.log("respawn: ", result);
		// result = await api.raw.game.placeSpawn("W8N0", 12, 9, "spawn1");
		// console.log("spawn: ", result);

		// var result = await api.raw.register.submit("carver230620", "carver230620", "5560");
		// console.log("register: ", result);
		// await api.auth('carver230620', '5560');
		// result = await api.raw.game.placeSpawn("W6S0", 29, 26, "spawn1");
		// console.log("spawn: ", result);
		// result = await api.raw.auth.me();
		// console.log("me: ", result);
		// result = await api.raw.user.rooms(result._id);
		// console.log("me: ", result);
		
		// // var result = await api.raw.register.submit("gilmartin206077", "gilmartin206077", "8080");
		// // console.log("register: ", result);
		// await api.auth('gilmartin206077', '8080');
		// result = await api.raw.game.placeSpawn("W5S0", 20, 30, "spawn1");
		// console.log("spawn: ", result);
		
		// // var result = await api.raw.register.submit("robinson223537", "robinson223537", "0421");
		// // console.log("register: ", result);
		// await api.auth('robinson223537', '0421');
		// result = await api.raw.game.placeSpawn("W6N1", 27, 28, "spawn1");
		// console.log("spawn: ", result);

		
		// var result = await api.raw.register.submit("test1", "test1", "1234");
		// console.log("register: ", result);
		// await api.auth('test1', '1234');
		// result = await api.raw.user.respawn();
		// console.log("respawn: ", result);
		// result = await api.raw.game.placeSpawn("W7N12", 25, 2, "spawn1");
		// console.log("spawn: ", result);
		
		// var result = await api.raw.register.submit("carver230620-sandbox", "carver230620-sandbox", "1234");
		// console.log("result: ", result);
		// result = await api.auth('carver230620-sandbox', '1234');
		// console.log("result: ", result);
		// result = await api.raw.game.placeSpawn("W1N12", 39, 25, "spawn1");
		// console.log("result: ", result);


		// await api.auth('carver230620-sandbox', '1234');
		// await api.auth('carver230620', '5560');

		// result = await api.raw.auth.me();
		// console.log("me: ", result);

		// result = await api.raw.user.console("console.log(Object.getPrototypeOf(Game.creeps[Object.keys(Game.creeps)[0]]))");
		// result = await api.raw.user.console("var creep1Name = Object.keys(Game.creeps)) console.log(Object.getPrototypeOf(Game.creeps[creep1Name]))");
		// console.log("me: ", result);
		
		// result = await api.raw.game.placeSpawn("W4N1", 42, 8, "spawn1");
		// console.log(result);

		// result = await api.raw.user.respawn();
		// console.log("respawn: ", result);

		// var myRoom = "W8N0";
		// result = await api.auth('shampton140961', '6942');
		// console.log("respawn: ", result);
		// result = await api.raw.auth.me();
		// console.log("me: ", result);
		// result = await api.raw.user.rooms(result._id);
		// console.log("worldStatus: ", result);
		// result = await api.raw.game.roomOverview(myRoom);
		// console.log("roomOverview: ", result);
		// result = await api.raw.game.roomStatus(myRoom);
		// console.log("roomStatus: ", result);

		// result = await api.raw.user.memory.get("");
		// console.log("memory: ", result);

		

		// var test = await api.auth('screeps@email.com', 'notMyPass')

		// await api.auth('gilmartin206077', '8080');
		// var user = await api.me();		
		// console.log(user)
		// // result = await api.raw.auth.me();
		// // console.log(result)
		// result = await api.raw.game.placeSpawn(myRoom, 22, 10, "spawn1");
		// console.log(result);

		// console.log("done")

		// var result = await api.raw.register.submit("carver2", "carver2", "1234");
		// var result = await api.raw.auth.signin("carver230620", "5560");

		// api.token = result.token;
		// result = await api.raw.auth.me();
		// console.log("me: ", result);
		// result = await api.raw.user.rooms(result._id);
		// console.log(result);
		// // result = await api.raw.user.code.get();
		// // console.log(result);
		// result = await api.raw.user.branches();
		// console.log(result);
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

		const myRoom = "W6S2";
		// result = await api.raw.user.worldStatus();
		// console.log("worldStatus: ", result);
		// result = await api.raw.game.roomOverview(myRoom);
		// console.log("roomOverview: ", result);
		// result = await api.raw.game.roomStatus(myRoom);
		// console.log("roomStatus: ", result);

		await api.auth('carver230620', '5560');
		// result = await api.raw.game.mapStats(myRoom);
		// console.log("worldStatus: ", result);

		result = await api.raw.game.createInvader("W8N8", 7, 5, "small", "Melee");
		console.log("result: ", result);

	} catch (error) {
		console.log(error)
	}



})()