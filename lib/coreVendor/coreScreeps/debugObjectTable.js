
function debugObjectTable(tableObject, topLeftCornerData, toggleTitle) {

	var table = buildObjectTable(tableObject, topLeftCornerData, toggleTitle);

	console.log(table);
}

debugObjectTable.primary = function(tableObject, topLeftCornerData, toggleTitle) {

	var table = buildObjectTable(tableObject, topLeftCornerData, toggleTitle, "#6fbbef");

	console.log(table);
}

debugObjectTable.secondary = function(tableObject, topLeftCornerData, toggleTitle) {

	var table = buildObjectTable(tableObject, topLeftCornerData, toggleTitle, "#6c757d");

	console.log(table);
}

debugObjectTable.warning = function(tableObject, topLeftCornerData, toggleTitle) {

	var table = buildObjectTable(tableObject, topLeftCornerData, toggleTitle, "#orange");

	console.log(table);
}

debugObjectTable.danger = function(tableObject, topLeftCornerData, toggleTitle) {

	var table = buildObjectTable(tableObject, topLeftCornerData, toggleTitle, "#red");

	console.log(table);
}

debugObjectTable.highlight = function(tableObject, topLeftCornerData, toggleTitle) {

	var table = buildObjectTable(tableObject, topLeftCornerData, toggleTitle, "#yellow");

	console.log(table);
}

debugObjectTable.muted = function(tableObject, topLeftCornerData, toggleTitle) {

	var table = buildObjectTable(tableObject, topLeftCornerData, toggleTitle, "#6c757d");

	console.log(table);
}

function buildObjectTable(tableObject, topLeftCornerData, toggleTitle, color) {

	var rowKeys = [];
	var columnKeys = [];

	for (var rowKey in tableObject) {

		rowKeys.push(rowKey);

		for (var columnKey in tableObject[rowKey]) {
			columnKeys.push(columnKey);
		}
	}

	columnKeys = _.uniq(columnKeys).sort();

	var table = `<table style='text-align:center;border:1px solid ${color};color:${color}'>`;

	table += "<tr>";
	if (topLeftCornerData) {
		table += "<td>" + topLeftCornerData + "</td>";
	} else {
		table += "<td></td>";
	}
	for (var columnKey of columnKeys) {
		table += `<td>${columnKey}</td>`
	}
	table += "</tr>";

	for (var rowKey of rowKeys) {
		table += "<tr>";
		table += `<td>${rowKey}</td>`
		for (var columnKey of columnKeys) {

			table += "<td>";
			if (tableObject[rowKey][columnKey]) {
				table += tableObject[rowKey][columnKey];
			}
			table += "</td>";
		}
		table += "</tr>";
	}

	table += "</table>";

	if (toggleTitle) {

		table = `
			<a style='color:${color}' data-toggle="collapse" href="#table-${Game.time}" >${toggleTitle}</a>
			<div class="collapse multi-collapse" id="table-${Game.time}">	
				${table}
			</div>
		`
	}

	return table;
}


module.exports = debugObjectTable;