export default function SucessMessage({ brickMoveCount, resetGame }) {
  return (
    <>
      <h3>
        You did it! <br />
        You moved {brickMoveCount} times a brick.
      </h3>
      <button onClick={resetGame}>Restart game</button>
    </>
  );
}
