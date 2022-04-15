import "./styles.css";

import GameBoard from "./components/GameBoard";
import SuccessMessage from "./components/SuccessMessage";
import RebuildThisGameBoard from "./components/RebuildThisGameBoard";

import useGameOfRubrik from "./hooks/useGameOfRubrik";

export default function App() {
  const {
    matrix,
    hitMatrix,
    brickMoveCount,
    changePosition,
    isGameFinish,
    resetGame,
  } = useGameOfRubrik();
  return (
    <div className="App">
      <h1>A game of rubik</h1>
      <h2>Rebuild this square:</h2>
      <div className="gameContainer">
        <RebuildThisGameBoard matrix={matrix} hitMatrix={hitMatrix} />
        {isGameFinish && (
          <SuccessMessage
            resetGame={resetGame}
            brickMoveCount={brickMoveCount}
          />
        )}
        <GameBoard matrix={matrix} changePosition={changePosition} />
      </div>
    </div>
  );
}
