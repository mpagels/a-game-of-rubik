import "./styles.css";

import GameBoard from "./components/GameBoard";
import SucessMessage from "./components/SucessMessage";
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
      <h1>A game of rubrik</h1>
      <h2>Rebuild this square:</h2>
      <div className="gameContainer">
        <RebuildThisGameBoard matrix={matrix} hitMatrix={hitMatrix} />
        <GameBoard matrix={matrix} changePosition={changePosition} />
      </div>
      {isGameFinish && (
        <SucessMessage resetGame={resetGame} brickMoveCount={brickMoveCount} />
      )}
    </div>
  );
}
