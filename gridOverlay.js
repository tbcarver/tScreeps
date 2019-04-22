

	var canvasElement = document.getElementsByTagName("canvas")[0];

	var cellWidth = Math.floor(750 / 50);
	var cellHeight = Math.floor(750 / 50);

	var tableElement = document.createElement("table");
	tableElement.style.width = 750 + "px";
	tableElement.style.height = 750 + "px";
	tableElement.style.position = "absolute";
	tableElement.style.top = 0;
	tableElement.style.left = 0;
	tableElement.style.borderCollapse = "collapse";
	tableElement.style.borderSpacing = 0;

	for (var rowIndex = 0; rowIndex < 50; rowIndex++) {

		var rowElement = document.createElement("tr");

		for (var columnIndex = 0; columnIndex < 50; columnIndex++) {

			var tableCellElement = document.createElement("td");

			tableCellElement.style.width = cellWidth + "px";
			tableCellElement.style.height = cellHeight + "px";
			tableCellElement.style.border = "1px solid #777777";
			tableCellElement.style.boxSizing = "border-box";
			tableCellElement.title = columnIndex + ", " + rowIndex;

			rowElement.appendChild(tableCellElement);
		}

		tableElement.appendChild(rowElement);
	}

	canvasElement.parentElement.appendChild(tableElement);
	canvasElement.parentElement.style.position = "relative";