
var roomTools = {};

var adjacentDifferentials = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 },
];

// From @Screeps/backend/lib/utils.js
roomTools.roomNameFromXY = function(x, y) {
	if (x < 0) {
		x = 'W' + (-x - 1);
	}
	else {
		x = 'E' + (x);
	}
	if (y < 0) {
		y = 'N' + (-y - 1);
	}
	else {
		y = 'S' + (y);
	}
	return "" + x + y;
}

// From @Screeps/backend/lib/utils.js
roomTools.roomNameToXY = function(name) {
	var [match, hor, x, ver, y] = name.match(/^(\w)(\d+)(\w)(\d+)$/);
	if (hor == 'W') {
		x = -x - 1;
	}
	else {
		x = +x;
		//x--;
	}
	if (ver == 'N') {
		y = -y - 1;
	}
	else {
		y = +y;
		//y--;
	}
	return [x, y];
}

roomTools.getAdjacentRoomNames = function(roomName) {

	var adjacentRoomNames = [];
	var roomXY = this.roomNameToXY(roomName);

	for (var adjacentDifferential of adjacentDifferentials) {

		var adjacentX = roomXY[0] + adjacentDifferential.x;
		var adjacentY = roomXY[1] + adjacentDifferential.y;
		var adjacentRoomName = this.roomNameFromXY(adjacentX, adjacentY);

		adjacentRoomNames.push(adjacentRoomName);
	}

	return adjacentRoomNames;
}

roomTools.isDropContainer = function(container, range) {

	range = range || 1;
	var isDropContainer = false;
	var sources = container.room.find(FIND_SOURCES);

	for (var source of sources) {

		if (source.pos.inRangeTo(container, range)) {

			isDropContainer = true;
			break;
		}
	}

	return isDropContainer;
}

roomTools.createFlag = function(name, colorConstant, positions) {

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);
			var result = Game.rooms[positions[index].roomName].createFlag(position, name, colorConstant);
			debug.highlight(`flag created: ${result} ${name} ${colorConstant}`);
		}
	}
}

roomTools.observeRoom = function(roomName, observerRoomName) {

	var observers = Game.rooms[observerRoomName].find(FIND_STRUCTURES, {
		filter: {
			structureType: STRUCTURE_OBSERVER
		}
	})

	if (observers.length > 0) {

		var result = observers[0].observeRoom(roomName);

		if (result !== OK) {
			debug.warning(`Observe room ${roomName} from observer ${observerRoomName} failed: ${result}`);
		}
	} else {
		debug.warning(`Observer not found in room ${observerRoomName}`);
	}
}

// roomTools.lookAt = function() {

// 	var positions =

// 		[{ "x": "24", "y": "7", "roomName": "W6S0" }]

// 	if (positions.length > 0) {

// 		for (var index in positions) {

// 			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);

// 			var looked = room.lookAt(position);
// 			// var looked = room.lookAt(positions[index]);
// 			// var looked = room.lookAt(spawn);
// 			// var looked = room.lookAt(15, 15);
// 			// debug.danger(positions[index]);
// 			debug.primary(looked);
// 		}
// 	}
// }

roomTools.consoleEnemies = function() {

	for (var index in Game.rooms) {

		var room = Game.rooms[index];

		const enemies = room.find(FIND_HOSTILE_CREEPS);

		if (enemies.length > 0) {

			var health = "";

			for (enemy of enemies) {

				health += enemy.hits + " " + Math.ceil((enemy.hits / enemy.hitsMax) * 100) + "% " +
					enemy.ticksToLive + " ";
			}

			debug.danger(room.name + " Enemies!", health);
		}
	}
}

roomTools.consoleWall = function() {

	const target = spawn.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_WALL
	});

	if (target) {

		debug.primary("wall", target);
	}
}

roomTools.visualize = function(pathToObject, pathFromObject) {

	var path = room.findPath(pathToObject.pos, pathFromObject.pos, { ignoreCreeps: true });

	// debug.danger(spawn.pos);

	for (var location of path) {

		if (location.x === 39 && location.y === 7) {
			continue;
		}

		if (location.x === 38 && location.y === 8) {
			continue;
		}

		if (location.x === 37 && location.y === 8) {
			continue;
		}

		// 	debug.danger(location)
		// 	room.visual.rect(0, 0, location, 15, 15, {fill:"#777"})
		room.visual.circle(location, { radius: 1 / 2, fill: "danger" });
		// room.visual.rect(0, 0, location, .60, .60, {fill:"#777"})
	}
	// room.visual.circle(spawn.pos.x + 5, spawn.pos.y + 5, {radius:.30,fill:"danger"});
}

roomTools.visualizeStructureHealth = function() {

	const targets = room.find(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			structure.structureType !== STRUCTURE_WALL
	});

	for (var index in targets) {

		room.visual.circle(targets[index].pos, { radius: .25, stroke: "red", fill: "transparent" });
	}
}

roomTools.visualizeFlags = function() {

	const flags = room.find(FIND_FLAGS);

	for (var index in flags) {
		var pos = flags[index].pos;
		room.visual.line(pos.x, pos.y, pos.x, pos.y - 1, { width: .2, color: "red" });
	}
}

roomTools.visualizeCreepByType = function(creepType, color) {

	const targets = _.filter(Game.creeps, creep => creep.memory.type === creepType);

	for (var index in targets) {

		room.visual.circle(targets[index].pos, { radius: .25, stroke: color, fill: color });
	}
}


module.exports = roomTools;