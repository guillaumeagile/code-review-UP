/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    if (this.isFirstMove() && symbol == 'O') {
      throw new Error('Invalid first player');
    }

    if (this.isSamePlayer(symbol)) {
      throw new Error('Invalid next player');
    }

    if (this.isPositionTaken(x, y)) {
      throw new Error('Invalid position');
    }

    // Update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    if (this.isWinningRow(0)) {
      return this._board.TileAt(0, 0)!.Symbol;
    }

    if (this.isWinningRow(1)) {
      return this._board.TileAt(1, 0)!.Symbol;
    }

    if (this.isWinningRow(2)) {
      return this._board.TileAt(2, 0)!.Symbol;
    }

    return ' ';
  }

  private isFirstMove(): boolean {
    return this._lastSymbol == ' ';
  }

  private isSamePlayer(symbol: string): boolean {
    return symbol == this._lastSymbol;
  }

  private isPositionTaken(x: number, y: number): boolean {
    return this._board.TileAt(x, y).Symbol != ' ';
  }

  private isWinningRow(row: number): boolean {
    return this._board.TileAt(row, 0)!.Symbol != ' ' &&
           this._board.TileAt(row, 0)!.Symbol == this._board.TileAt(row, 1)!.Symbol &&
           this._board.TileAt(row, 1)!.Symbol == this._board.TileAt(row, 2)!.Symbol;
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
