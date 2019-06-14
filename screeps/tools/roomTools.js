
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

roomTools.isDropContainer = function(container) {

	var isDropContainer = false;
	var sources = container.room.find(FIND_SOURCES);

	for (var source of sources) {
		for (var adjacentDifferential of adjacentDifferentials) {

			// TODO: use the isAdjacent to function of RoomPosition

			if (source.pos.x + adjacentDifferential.x === container.pos.x &&
				source.pos.y + adjacentDifferential.y === container.pos.y) {

				isDropContainer = true;
				break;
			}
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