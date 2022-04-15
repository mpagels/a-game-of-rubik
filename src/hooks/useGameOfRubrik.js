import { useState } from "react";
import shuffle, { colorBrickArray } from "../utils/rubrikGenerator";

export default function useGameOfRubrik() {
  const [brickMoveCount, setBrickMoveCount] = useState(0);
  const [matrix, setMatrix] = useState(() => shuffle(colorBrickArray));
  const [hitMatrix, setHitMatrix] = useState(() =>
    shuffle(
      colorBrickArray.filter((color) => color !== ""),
      true
    )
  );

  const freeQuaderPosition = findFreeQuaderPosition();

  function findFreeQuaderPosition() {
    for (let column = 0; column < matrix.length; column++) {
      for (let row = 0; row < matrix[column].length; row++) {
        if (matrix[column][row] === "") {
          return [column, row];
        }
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

    if (isBrickMovable()) {
      switchPosition();
    }

    function isBrickMovable() {
      leftFromFreeBlock[1] += 1;
      topFromFreeBlock[0] += 1;
      aboveFromFreeBlock[0] -= 1;
      rightFromFreeBlock[1] -= 1;

      const positions = [
        leftFromFreeBlock,
        topFromFreeBlock,
        rightFromFreeBlock,
        aboveFromFreeBlock,
      ];
      return positions.some(
        (position) => position.toString() === freeQuaderPosition.toString()
      );
    }

    function switchPosition() {
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

  const isGameFinish = matrixHitBox.toString() === hitMatrix.flat().toString();

  return {
    matrix,
    hitMatrix,
    brickMoveCount,
    changePosition,
    isGameFinish,
    resetGame,
  };
}
