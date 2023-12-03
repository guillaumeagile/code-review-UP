/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != emptyPlay) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this._board.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this._board.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this._board.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this._board.TileAt(row, firstColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(row, secondColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(row, thirdColumn)!.Symbol != emptyPlay
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this._board.TileAt(row, firstColumn)!.Symbol ==
        this._board.TileAt(row, secondColumn)!.Symbol &&
      this._board.TileAt(row, thirdColumn)!.Symbol == this._board.TileAt(row, secondColumn)!.Symbol
    );
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private symbol: string = ' ';

  constructor(x: number, y: number, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  }

  get isNotEmpty() {
    return this.Symbol !== emptyPlay;
  }

  hasSameSymbolAs(other: Tile) {
    return this.Symbol === other.Symbol;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updateSymbol(newSymbol: string) {
    this.symbol = newSymbol;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, emptyPlay));
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, emptyPlay)))!;
  }  

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays
      .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!
      .updateSymbol(symbol);
  }
  
}
