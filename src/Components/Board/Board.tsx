import { useState } from "react";
import "./board.scss";
import Sudoku from "../../utils/Sudoku";

export default function Board() {
  const sudoku = new Sudoku(9, 9);
  const [board, setBoard] = useState(sudoku.board);
  console.log(board);
  return (
    <div className="board-grid">
      {board.map((row) => {
        return row.map((cell, index) => (
          <input key={index} className="board-cell" maxLength={1} />
        ));
      })}
    </div>
  );
}
