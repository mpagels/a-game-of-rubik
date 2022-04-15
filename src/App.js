import "./styles.css";

import shuffle, { colorBrickArray } from "./utils/rubrikGenerator";
import { useState } from "react";

export default function App() {
  const [brickMoveCount, setBrickMoveCount] = useState(0);
  const [matrix, setMatrix] = useState(() => shuffle(colorBrickArray));
  const [hitMatrix, setHitMatrix] = useState(() =>
    shuffle(
      colorBrickArray.filter((color) => color !== ""),
      true
    )
  );
  let freeQuaderPosition;
  console.log(matrix);
  for (let column = 0; column < matrix.length; column++) {
    for (let row = 0; row < matrix[column].length; row++) {
      if (matrix[column][row] === "") {
        freeQuaderPosition = [column, row];
      }
    }
  }

  function resetGame() {
    setBrickMoveCount(0);
    setMatrix(shuffle(colorBrickArray));
    setHitMatrix(
      shuffle(
        colorBrickArray.filter((color) => color !== ""),
        true
      )
    );
  }

  function changePosition(clickedPosition) {
    const [
      leftFromFreeBlock,
      topFromFreeBlock,
      rightFromFreeBlock,
      aboveFromFreeBlock,
    ] = Array(4)
      .fill([...clickedPosition])
      .map((arr) => JSON.parse(JSON.stringify(arr)));

    // left from free block
    leftFromFreeBlock[1] += 1;
    if (leftFromFreeBlock.toString() === freeQuaderPosition.toString()) {
      switchPostion();
    }

    // top from free block
    topFromFreeBlock[0] += 1;
    if (topFromFreeBlock.toString() === freeQuaderPosition.toString()) {
      switchPostion();
    }

    // right from free block
    rightFromFreeBlock[1] -= 1;
    if (rightFromFreeBlock.toString() === freeQuaderPosition.toString()) {
      switchPostion();
    }

    // right from free block
    aboveFromFreeBlock[0] -= 1;
    if (aboveFromFreeBlock.toString() === freeQuaderPosition.toString()) {
      switchPostion();
    }

    function switchPostion() {
      const clickedColor = matrix[clickedPosition[0]][clickedPosition[1]];
      const newMatrix = JSON.parse(JSON.stringify(matrix));
      newMatrix[freeQuaderPosition[0]][freeQuaderPosition[1]] = clickedColor;
      newMatrix[clickedPosition[0]][clickedPosition[1]] = "";
      setBrickMoveCount((count) => count + 1);
      setMatrix(newMatrix);
    }
  }

  const matrixHitBox = [
    ...matrix[1].slice(1, 4),
    ...matrix[2].slice(1, 4),
    ...matrix[3].slice(1, 4),
  ];

  const hitBoardHitBox = hitMatrix.flat();
  const isGameFinish = matrixHitBox.toString() === hitBoardHitBox.toString();

  return (
    <div className="App">
      <h1>A game of rubrik</h1>

      <h2>Rebuild this square:</h2>
      <div className="gameContainer">
        <div className="hitBoardWrapper">
          <div className="hitBoardFull">
            {matrix.map((row, rowIndex) =>
              row.map((column, ColumnIndex) => (
                <div key={ColumnIndex} className="shadowBrick"></div>
              ))
            )}
          </div>
          <div className="hitBoard">
            {hitMatrix.map((row, rowIndex) =>
              row.map((column, ColumnIndex) => (
                <div
                  key={ColumnIndex}
                  className="hitBrick"
                  style={{ backgroundColor: column }}
                ></div>
              ))
            )}
          </div>
        </div>
        <div className="gameBoard">
          {matrix.map((row, rowIndex) =>
            row.map((column, ColumnIndex) => (
              <div
                onClick={() => changePosition([rowIndex, ColumnIndex])}
                key={ColumnIndex}
                style={{ backgroundColor: column }}
              ></div>
            ))
          )}
        </div>
      </div>
      {isGameFinish && (
        <>
          <h3>
            You did it! <br />
            You moved {brickMoveCount} times a brick.
          </h3>
          <button onClick={resetGame}>Restart game</button>
        </>
      )}
    </div>
  );
}
