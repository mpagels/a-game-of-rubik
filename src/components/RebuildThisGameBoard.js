export default function RebuildThisGameBoard({ matrix, hitMatrix }) {
  return (
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
  );
}
