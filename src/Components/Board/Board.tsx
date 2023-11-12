import Sudoku from "../../utils/Sudoku";
import CSSVariables from "../../assets/styles/variables.module.scss";
import "../../assets/styles/board.scss";

const { rows, cols, squareCols, squareRows } = CSSVariables;

export default function Board() {
  const sudoku = new Sudoku(+rows, +cols);
  sudoku.fillBoard();
  const squareBoard = sudoku.generateEmptyBoard(+squareRows, +squareCols);

  return (
    <div className="sudoku">
      <table className="sudoku-board">
        {sudoku.board.map((row) => {
          return (
            <tr>
              {row.map((cell) => {
                return (
                  <td>
                    <input maxLength={1} value={cell} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      <table className="sudoku-square-board">
        {squareBoard.map((row) => {
          return (
            <tr>
              {row.map((cell) => {
                return <td>{cell}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
