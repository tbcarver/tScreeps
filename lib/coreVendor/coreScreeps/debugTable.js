

function table(...logs) {

	var message = buildMessage(logs);

	console.log(message);
}

table = function(data) {

	var table = buildComplexTable(data, "white");

	console.log(table);
}

table.muted = function(data) {

	var table = buildComplexTable(data, "#6c757d");

	console.log(table);
}

table.muted = function(data) {

	var table = buildComplexTable(data, "#6c757d");

	console.log(table);
}

function buildComplexTable(data, color) {

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


module.exports = table;