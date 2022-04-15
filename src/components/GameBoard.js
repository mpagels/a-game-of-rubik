export default function GameBoard({ matrix, changePosition }) {
  return (
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
  );
}
