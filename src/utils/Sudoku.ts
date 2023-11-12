export default class Sudoku {
  board = [];
  rows = 9;
  cols = 9;
  totalCells = this.rows * this.cols;
  filledCells = 0;

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.totalCells = rows * cols;
    this.board = this.generateEmptyBoard(this.rows, this.cols);
  }

  generateEmptyBoard(rows, cols) {
    const board = [];
    for (let index = 0; index < rows; index++) {
      const row = new Array(cols).fill(null, 0, cols);
      board.push(row);
    }

    return board;
  }

  generateRandomInteger() {
    return Math.floor(Math.random() * 9) + 1;
  }

  getCol(colIndex) {
    return this.board.map((row, rowIndex) => row[colIndex]);
  }

  getRow(rowIndex) {
    return this.board[rowIndex];
  }

  checkRow(rowIndex, integer) {
    return this.board[rowIndex].includes(integer);
  }

  checkCol(colIndex, integer) {
    const col = this.getCol(colIndex);
    return col.includes(integer);
  }

  checkSquare(rowIndex, colIndex, integer) {
    const startRow = Math.floor(rowIndex / 3) * 3;
    const startCol = Math.floor(colIndex / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[startRow + i][startCol + j] === integer) {
          return true;
        }
      }
    }

    return false;
  }

  hasError(rowIndex, colIndex, integer) {
    const condition =
      this.checkRow(rowIndex, integer) ||
      this.checkCol(colIndex, integer) ||
      this.checkSquare(rowIndex, colIndex, integer);

    return condition;
  }

  solve() {
    return this.solveRecursive();
  }

  solveRecursive() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (!this.hasError(row, col, num)) {
              this.board[row][col] = num;

              if (this.solveRecursive()) {
                return true;
              }

              this.board[row][col] = 0;
            }
          }

          return false;
        }
      }
    }

    return true;
  }

  fillBoardByDifficultyLevel() {}

  fillBoard() {
    this.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const int = this.generateRandomInteger();

        if (!this.checkRow(rowIndex, int)) {
          if (!this.checkCol(colIndex, int)) {
            this.board[rowIndex][colIndex] = int;
          }
        }
      });
    });

    this.filledCells = this.board.flat().filter((item) => item).length;
  }
}
