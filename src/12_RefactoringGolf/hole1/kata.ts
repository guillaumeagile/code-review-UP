/* eslint-disable */

// Domain constants (renamed to real TicTacToe vocabulary)
const ROW_0 = 0;
const ROW_2 = 2;

const COL_0 = 0;
const COL_1 = 1;
const COL_2 = 2;

const MARK_O = "O";
const EMPTY = " ";

// --------------------------------------------
// Game = main domain service
// --------------------------------------------
export class Game {
  private lastMark = EMPTY;
  private board = new Board();

  /**
   * Main game action: a player places a mark on the grid.
   * Refactoring exo 7:
   * - Renamed variables/methods to domain language
   * - Accept a Square object instead of (player, x, y)
   */
  public Play(mark: string, row: number, col: number): void {
    this.validateFirstMove(mark);
    this.validateTurnOrder(mark);
    this.validateSquareIsFree(row, col);

    this.lastMark = mark;
    this.board.place(new Square(row, col, mark)); // Exo 7: long parameter list removed
  }

  private validateFirstMove(mark: string) {
    if (this.lastMark === EMPTY && mark === MARK_O) {
      throw new Error("Invalid first player");
    }
  }

  private validateTurnOrder(mark: string) {
    if (mark === this.lastMark) {
      throw new Error("Invalid next player");
    }
  }

  private validateSquareIsFree(row: number, col: number) {
    if (this.board.isOccupied(row, col)) {
      throw new Error("Invalid position");
    }
  }

  public Winner(): string {
    return this.board.findWinningRow();
  }
}

// --------------------------------------------
// Square (ex-Tile)
// Stores mark at a grid coordinate
// --------------------------------------------
class Square {
  constructor(
      public row: number,
      public col: number,
      public mark: string = EMPTY
  ) {}

  get isNotEmpty() {
    return this.mark !== EMPTY;
  }

  hasSameMarkAs(other: Square) {
    return this.mark === other.mark;
  }

  hasSamePositionAs(other: Square) {
    return this.row === other.row && this.col === other.col;
  }

  updateMark(mark: string) {
    this.mark = mark;
  }
}

// --------------------------------------------
// Board (ex-plays list, but cleaner names)
// --------------------------------------------
class Board {
  private squares: Square[] = [];

  constructor() {
    for (let r = ROW_0; r <= ROW_2; r++) {
      for (let c = COL_0; c <= COL_2; c++) {
        this.squares.push(new Square(r, c, EMPTY));
      }
    }
  }

  public isOccupied(row: number, col: number) {
    return this.squareAt(row, col).isNotEmpty;
  }

  /**
   * Exo 7 refactoring:
   * Instead of passing row, col, mark separately,
   * we now accept a Square objet.
   */
  public place(square: Square): void {
    this.squareAt(square.row, square.col).updateMark(square.mark);
  }

  private squareAt(row: number, col: number): Square {
    return this.squares.find(s => s.row === row && s.col === col)!;
  }

  public findWinningRow(): string {
    for (let r = 0; r < 3; r++) {
      const rowSquares = [
        this.squareAt(r, COL_0),
        this.squareAt(r, COL_1),
        this.squareAt(r, COL_2)
      ];


      if (rowSquares.every(s => s.isNotEmpty) &&
          // @ts-ignore
          rowSquares[0].mark === rowSquares[1].mark &&
          // @ts-ignore
          rowSquares[1].mark === rowSquares[2].mark) {
        // @ts-ignore
        return rowSquares[0].mark;
      }
    }

    return EMPTY;
  }
}
