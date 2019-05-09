

var roomTools = {};

var neighborDifferentials = [
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
	var sources = global.room.find(FIND_SOURCES);

	for (var source of sources) {
		for (var neighborDifferential of neighborDifferentials) {

			if (source.pos.x + neighborDifferential.x === container.x &&
				source.pos.y + neighborDifferential.y === container.y) {

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
			var result = global.room.createFlag(position, name, colorConstant);
			debug.highlight(`flag created: ${result} ${name} ${colorConstant}`);
		}
	}
}

roomTools.lookAt = function() {

	var positions =

		[{ "x": "24", "y": "7", "roomName": "W6S0" }]

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);

			var looked = global.room.lookAt(position);
			// var looked = global.room.lookAt(positions[index]);
			// var looked = global.room.lookAt(global.spawn);
			// var looked = global.room.lookAt(15, 15);
			// debug.danger(positions[index]);
			debug.primary(looked);
		}
	}
}

roomTools.consoleEnemies = function() {

	const enemies = global.room.find(FIND_HOSTILE_CREEPS);

	if (enemies.length > 0) {

		var health = "";

		for (enemy of enemies) {

			health += enemy.hits + " " + Math.ceil((enemy.hits / enemy.hitsMax) * 100) + "% " +
				enemy.ticksToLive + " ";
		}

		debug.danger("Enemies!", health);
	}
}

roomTools.consoleWall = function() {

	const target = global.spawn.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_WALL
	});

	if (target) {

		debug.primary("wall", target);
	}
}

roomTools.visualize = function(pathToObject, pathFromObject) {

	var path = global.room.findPath(pathToObject.pos, pathFromObject.pos, { ignoreCreeps: true });

	// debug.danger(global.spawn.pos);

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
		// 	global.room.visual.rect(0, 0, location, 15, 15, {fill:"#777"})
		global.room.visual.circle(location, { radius: 1 / 2, fill: "danger" });
		// global.room.visual.rect(0, 0, location, .60, .60, {fill:"#777"})
	}
	// global.room.visual.circle(global.spawn.pos.x + 5, global.spawn.pos.y + 5, {radius:.30,fill:"danger"});
}

roomTools.visualizeStructureHealth = function() {

	const targets = global.room.find(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			structure.structureType !== STRUCTURE_WALL
	});

	for (var index in targets) {

		global.room.visual.circle(targets[index].pos, { radius: .25, stroke: "red", fill: "transparent" });
	}
}

roomTools.visualizeFlags = function() {

	const flags = global.room.find(FIND_FLAGS);

	for (var index in flags) {
		var pos = flags[index].pos;
		global.room.visual.line(pos.x, pos.y, pos.x, pos.y - 1, { width: .2, color: "red" });
	}
}

roomTools.visualizeCreepByType = function(creepType, color) {

	const targets = _.filter(Game.creeps, creep => creep.memory.type === creepType);

	for (var index in targets) {

		global.room.visual.circle(targets[index].pos, { radius: .25, stroke: color, fill: color });
	}
}


module.exports = roomTools;