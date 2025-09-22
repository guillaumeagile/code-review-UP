const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const emptySymbol = " ";

export class Game {
  private _lastSymbol = emptySymbol;
  private _board: Board = new Board();

  public Play(symbol: string, row: number, column: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validateCellIsEmpty(row, column);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, row, column);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptySymbol) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validateCellIsEmpty(row: number, column: number) {
    if (this._board.cellAt(row, column).isOccupied) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, row: number, column: number) {
    this._board.placeSymbolAt(player, row, column);
  }

  public Winner(): string {
    return this._board.winningRowSymbol();
  }
}

class Cell {
  private row: number = 0;
  private column: number = 0;
  private symbol: string = " ";

  constructor(row: number, column: number, symbol: string) {
    this.row = row;
    this.column = column;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  }

  get isOccupied() {
    return this.Symbol !== emptySymbol;
  }

  matchesSymbol(other: Cell) {
    return this.Symbol === other.Symbol;
  }

  matchesCoordinates(other: Cell) {
    return this.row == other.row && this.column == other.column;
  }

  setSymbol(newSymbol: string) {
    this.symbol = newSymbol;
  }
}

class Board {
  private _cells: Cell[] = [];

  constructor() {
    for (let row = firstRow; row <= thirdRow; row++) {
      for (let column = firstColumn; column <= thirdColumn; column++) {
        this._cells.push(new Cell(row, column, emptySymbol));
      }
    }
  }

  public cellAt(row: number, column: number): Cell {
    return this._cells.find((c: Cell) =>
      c.matchesCoordinates(new Cell(row, column, emptySymbol)),
    )!;
  }

  public placeSymbolAt(symbol: string, row: number, column: number): void {
    this._cells
      .find((c: Cell) => c.matchesCoordinates(new Cell(row, column, symbol)))!
      .setSymbol(symbol);
  }

  public winningRowSymbol(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.cellAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.cellAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.cellAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptySymbol;
  }

  private isRowFull(row: number) {
    return (
      this.cellAt(row, firstColumn)!.isOccupied &&
      this.cellAt(row, secondColumn)!.isOccupied &&
      this.cellAt(row, thirdColumn)!.isOccupied
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.cellAt(row, firstColumn)!.matchesSymbol(
        this.cellAt(row, secondColumn)!,
      ) &&
      this.cellAt(row, thirdColumn)!.matchesSymbol(
        this.cellAt(row, secondColumn)!,
      )
    );
  }
}
