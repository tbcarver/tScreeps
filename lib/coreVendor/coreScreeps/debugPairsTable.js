

function debugPairsTable(keyValuePairs) {

	var table = buildKeyValuePairsTable(keyValuePairs);

	console.log(table);
}

debugPairsTable.primary = function(keyValuePairs) {

	var table = buildKeyValuePairsTable(keyValuePairs, "#6fbbef");

	console.log(table);
}

debugPairsTable.secondary = function(keyValuePairs) {

	var table = buildKeyValuePairsTable(keyValuePairs, "#6c757d");

	console.log(table);
}

debugPairsTable.warning = function(keyValuePairs) {

	var table = buildKeyValuePairsTable(keyValuePairs, "#orange");

	console.log(table);
}

debugPairsTable.danger = function(keyValuePairs) {

	var table = buildKeyValuePairsTable(keyValuePairs, "#red");

	console.log(table);
}

debugPairsTable.highlight = function(keyValuePairs) {

	var table = buildKeyValuePairsTable(keyValuePairs, "#yellow");

	console.log(table);
}

debugPairsTable.muted = function(keyValuePairs) {

	var table = buildKeyValuePairsTable(keyValuePairs, "#6c757d");

	console.log(table);
}

function buildKeyValuePairsTable(keyValuePairs, color) {

	var keyRow = "";
	var valueRow = "";

	keyRow += "<tr>";
	valueRow += "<tr>";
	for (var key in keyValuePairs) {

		keyRow += `<td>${key}</td>`;
		valueRow += `<td>${keyValuePairs[key]}</td>`;
	}
	keyRow += "</tr>";
	valueRow += "</tr>";

	var table = `<table style='text-align:center;border:1px solid ${color};color:${color}'>`;
	table += keyRow;
	table += valueRow;
	table += "</table>";

	return table;
}


module.exports = debugPairsTable;