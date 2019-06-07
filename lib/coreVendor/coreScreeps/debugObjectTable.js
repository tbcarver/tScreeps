
function debugObjectTable(tableObject) {

	var table = buildObjectTable(tableObject);

	console.log(table);
}

debugObjectTable.primary = function(tableObject) {

	var table = buildObjectTable(tableObject, "#6fbbef");

	console.log(table);
}

debugObjectTable.secondary = function(tableObject) {

	var table = buildObjectTable(tableObject, "#6c757d");

	console.log(table);
}

debugObjectTable.warning = function(tableObject) {

	var table = buildObjectTable(tableObject, "#orange");

	console.log(table);
}

debugObjectTable.danger = function(tableObject) {

	var table = buildObjectTable(tableObject, "#red");

	console.log(table);
}

debugObjectTable.highlight = function(tableObject) {

	var table = buildObjectTable(tableObject, "#yellow");

	console.log(table);
}

debugObjectTable.muted = function(tableObject) {

	var table = buildObjectTable(tableObject, "#6c757d");

	console.log(table);
}

function buildObjectTable(data, color) {

	var rowKeys = [];
	var columnKeys = [];

	for (var rowKey in data) {

		rowKeys.push(rowKey);

		for (var columnKey in data[rowKey]) {
			columnKeys.push(columnKey);
		}
	}

	columnKeys = _.uniq(columnKeys).sort();

	var table = `<table style='text-align:center;border:1px solid ${color};color:${color}'>`;

	table += "<tr>";
	table += "<td></td>";
	for (var columnKey of columnKeys) {
		table += `<td>${columnKey}</td>`
	}
	table += "</tr>";

	for (var rowKey of rowKeys) {
		table += "<tr>";
		table += `<td>${rowKey}</td>`
		for (var columnKey of columnKeys) {

			table += "<td>";
			if (data[rowKey][columnKey]) {
				table += data[rowKey][columnKey];
			}
			table += "</td>";
		}
		table += "</tr>";
	}

	table += "</table>";
	return table;
}


module.exports = debugObjectTable;