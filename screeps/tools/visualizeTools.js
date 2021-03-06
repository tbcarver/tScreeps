

var visualizeTools = {};

visualizeTools.visualize = function(pathToObject, pathFromObject) {

	var path = pathToObject.pos.room.findPath(pathToObject.pos, pathFromObject.pos, { ignoreCreeps: true });

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
		pathToObject.pos.room.visual.circle(location, { radius: 1 / 2, fill: "danger" });
		// room.visual.rect(0, 0, location, .60, .60, {fill:"#777"})
	}
	// room.visual.circle(spawn.pos.x + 5, spawn.pos.y + 5, {radius:.30,fill:"danger"});
}

visualizeTools.visualizePath = function(room, path, color) {

	if (typeof path === "string") {
		path = Room.deserializePath(path)
	}

	if (!color) {
		color = "white";
	}

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
		room.visual.circle(location, { radius: 1 / 3, stroke: "black", fill: color, opacity: .3 });
		// room.visual.rect(0, 0, location, .60, .60, {fill:"#777"})
	}
	// room.visual.circle(spawn.pos.x + 5, spawn.pos.y + 5, {radius:.30,fill:"danger"});
}

visualizeTools.visualizeStructureHealth = function() {

	for (var roomName in Game.rooms) {

		var room = Game.rooms[roomName];

		const targets = room.find(FIND_STRUCTURES, {
			filter: structure => structure.hits < structure.hitsMax &&
				!(structure.structureType === STRUCTURE_WALL ||
					structure.structureType === STRUCTURE_RAMPART)
		});

		for (var index in targets) {

			room.visual.circle(targets[index].pos, { radius: .25, stroke: "red", fill: "transparent" });
		}
	}
}

visualizeTools.visualizeCreepByType = function(creepType, color) {

	const targets = _.filter(Game.creeps, creep => creep.memory.type === creepType);

	for (var index in targets) {

		targets[index].room.visual.circle(targets[index].pos, { radius: .25, stroke: color, fill: color });
	}
}

visualizeTools.visualizeDyingCreep = function() {

	const targets = _.filter(Game.creeps, creep => creep.ticksToLive < 25);

	for (var index in targets) {

		targets[index].room.visual.circle(targets[index].pos, { radius: .25, stroke: "red", fill: "red", opacity: 1 });
	}
}

function getColorFromConstant(colorConstant) {

	var color = "white";

	switch (colorConstant) {
		case COLOR_RED:
			color = "red";
			break;
		case COLOR_PURPLE:
			color = "purple";
			break;
		case COLOR_BLUE:
			color = "blue";
			break;
		case COLOR_CYAN:
			color = "cyan";
			break;
		case COLOR_GREEN:
			color = "green";
			break;
		case COLOR_YELLOW:
			color = "yellow";
			break;
		case COLOR_ORANGE:
			color = "orange";
			break;
		case COLOR_BROWN:
			color = "brown";
			break;
		case COLOR_GREY:
			color = "grey";
			break;
		case COLOR_WHITE:
			color = "white";
			break;
	}

	return color;
}


module.exports = visualizeTools;