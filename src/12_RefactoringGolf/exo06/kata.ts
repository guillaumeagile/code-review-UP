/* eslint-disable */

// Domain constants for Tic-tac-toe
const topRow = 0;
const middleRow = 1;
const bottomRow = 2;

const leftColumn = 0;
const centerColumn = 1;
const rightColumn = 2;

const X_MARK = 'X';
const O_MARK = 'O';
const EMPTY_MARK = ' ';

export class Game {
  private _lastMark = EMPTY_MARK;
  private _board: Board = new Board();

  // place a mark (X or O) at given row/column
  public placeMark(mark: string, row: number, column: number): void {
    this.validateFirstMove(mark);
    this.validatePlayer(mark);
    this.validatePositionIsEmpty(row, column);

    this.updateLastMark(mark);
    this.updateBoard(mark, row, column);
  }

  private validateFirstMove(mark: string) {
    if (this._lastMark == EMPTY_MARK) {
      if (mark == O_MARK) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(mark: string) {
    if (mark == this._lastMark) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(row: number, column: number) {
    if (this._board.cellAt(row, column).isOccupied) {
      throw new Error('Invalid position');
    }
  }

  private updateLastMark(mark: string) {
    this._lastMark = mark;
  }

  private updateBoard(mark: string, row: number, column: number) {
    this._board.placeMarkAt(mark, row, column);
  }

  // returns the winning mark ('X' or 'O') or EMPTY_MARK when no winner yet
  public getWinner(): string {
    return this._board.findWinningRow();
  }
}

class Cell {
  private row: number = 0;
  private column: number = 0;
  private mark: string = EMPTY_MARK;

  constructor(row: number, column: number, mark: string) {
    this.row = row;
    this.column = column;
    this.mark = mark;
  }

  get Mark() {
    return this.mark;
  }

  get isOccupied() {
    return this.Mark !== EMPTY_MARK;
  }

  hasSameMarkAs(other: Cell) {
    return this.Mark === other.Mark;
  }

  hasSamePositionAs(other: Cell) {
    return this.row == other.row && this.column == other.column;
  }

  setMark(newMark: string) {
    this.mark = newMark;
  }
}

class Board {
  private _cells: Cell[] = [];

  constructor() {
    for (let r = topRow; r <= bottomRow; r++) {
      for (let c = leftColumn; c <= rightColumn; c++) {
        this._cells.push(new Cell(r, c, EMPTY_MARK));
      }
    }
  }

  public cellAt(row: number, column: number): Cell {
    return this._cells.find((t: Cell) => t.hasSamePositionAs(new Cell(row, column, EMPTY_MARK)))!;
  }

  public placeMarkAt(mark: string, row: number, column: number): void {
    this._cells.find((t: Cell) => t.hasSamePositionAs(new Cell(row, column, mark)))!.setMark(mark);
  }

  // Only checks horizontal rows (matches original behaviour)
  public findWinningRow(): string {
    if (this.isRowFull(topRow) && this.isRowFullWithSameMark(topRow)) {
      return this.cellAt(topRow, leftColumn)!.Mark;
    }

    if (this.isRowFull(middleRow) && this.isRowFullWithSameMark(middleRow)) {
      return this.cellAt(middleRow, leftColumn)!.Mark;
    }

    if (this.isRowFull(bottomRow) && this.isRowFullWithSameMark(bottomRow)) {
      return this.cellAt(bottomRow, leftColumn)!.Mark;
    }

    return EMPTY_MARK;
  }

  private isRowFull(row: number) {
    return (
      this.cellAt(row, leftColumn)!.isOccupied &&
      this.cellAt(row, centerColumn)!.isOccupied &&
      this.cellAt(row, rightColumn)!.isOccupied
    );
  }

  private isRowFullWithSameMark(row: number) {
    return (
      this.cellAt(row, leftColumn)!.hasSameMarkAs(this.cellAt(row, centerColumn)!) &&
      this.cellAt(row, rightColumn)!.hasSameMarkAs(this.cellAt(row, centerColumn)!)
    );
  }
}
