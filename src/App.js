import React, { useState } from "react";
import "./App.css";

function App() {
	const rows = 10;
	const columns = 10;
	const [grid, setGrid] = useState(
		Array(rows).fill(Array(columns).fill(false))
	);
	// console.log(Array(rows).fill(Array(columns)))
	const [startPoint, setStartPoint] = useState({ row: 0, col: 0 });
	const [endPoint, setEndPoint] = useState({ row: rows - 1, col: columns - 1 });
	const [dragging, setDragging] = useState(null);

	const toggleCell = (row, col) => {
		const newGrid = grid.map((rowArray, rowIndex) =>
			rowArray.map((cell, colIndex) =>
				rowIndex === row && colIndex === col ? !cell : cell
			)
		);
		setGrid(newGrid);
	};

	const handleDragStart = (row, col, type) => {
		if (type === "start") {
			setDragging("start");
		} else if (type === "end") {
			setDragging("end");
		}
		const pElement = document.createElement("p"); // Create a <p> element
		pElement.textContent = { type }; // Set the text content of the <p> element
		document.body.appendChild(pElement);
	};

	const handleDragEnd = () => {
		setDragging(null);
	};

	const handleDragOver = (event, row, col) => {
		event.preventDefault();

		if (dragging === "start") {
			if (!grid[row][col]) {
				setStartPoint({ row, col });
			}
		} else if (dragging === "end") {
			if (!grid[row][col]) {
				setEndPoint({ row, col });
			}
		}
	};

	return (
		<div className="grid-container">
			{grid.map((row, rowIndex) => (
				<div key={rowIndex} className="grid-row">
					{row.map((cell, colIndex) => (
						<div
							key={colIndex}
							className={`grid-cell ${
								rowIndex === startPoint.row && colIndex === startPoint.col
									? "start"
									: rowIndex === endPoint.row && colIndex === endPoint.col
									? "end"
									: cell
									? "active"
									: ""
							}`}
							onClick={() => toggleCell(rowIndex, colIndex)}
							onDragOver={(e) => handleDragOver(e, rowIndex, colIndex)}
							onDragEnd={() => handleDragEnd()}
						>
							{rowIndex == startPoint.row && colIndex == startPoint.col && (
								<div
									className="draggable"
									draggable={true}
									onDragStart={() =>
										handleDragStart(rowIndex, colIndex, "start")
									}
								>
									start
								</div>
							)}
							{rowIndex == endPoint.row && colIndex == endPoint.col && (
								<div
									className="draggable"
									draggable={true}
									onDragStart={() => handleDragStart(rowIndex, colIndex, "end")}
								>
									end
								</div>
							)}

							{/* <div
                className="draggable1"
                draggable={true}
                onDragStart={() => handleDragStart(rowIndex, colIndex, 'end')}
              >
                end
              </div> */}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default App;