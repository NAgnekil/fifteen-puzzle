import React, { useState, useEffect } from "react";
import "./App.css";

const ROWS = 4;
const COLUMNS = 4;

const generateRandomArray = (size) => {
  const arr = Array.from({ length: size }, (_, index) => index);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const initialGrid = generateRandomArray(ROWS * COLUMNS);

const App = () => {
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    const isSolved = grid.every((val, index) => val === index + 1);
    if (isSolved) alert("Grattis! Du löste pusslet!");
  }, [grid]);

  const handleClick = (index) => {
    const emptyIndex = grid.indexOf(0);
    if (isAdjacent(index, emptyIndex)) {
      const newGrid = [...grid];
      newGrid[emptyIndex] = newGrid[index];
      newGrid[index] = 0;
      setGrid(newGrid);
    }
  };

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / COLUMNS);
    const col1 = index1 % COLUMNS;
    const row2 = Math.floor(index2 / COLUMNS);
    const col2 = index2 % COLUMNS;

    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const renderGrid = () => {
    return grid.map((num, index) => (
      <div
        key={index}
        className={`tile ${num === 0 ? "empty" : ""}`}
        onClick={() => handleClick(index)}
      >
        {num !== 0 && num}
      </div>
    ));
  };

  const handleShuffle = () => {
    setGrid(generateRandomArray(ROWS * COLUMNS));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>15-Pusselspel</h1>
        <div className="grid">{renderGrid()}</div>
        <button onClick={handleShuffle}>Börja om</button>
      </header>
    </div>
  );
};

export default App;
