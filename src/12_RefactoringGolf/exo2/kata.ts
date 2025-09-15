/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == ' ' && player == 'O') {
      throw new Error('Invalid first player');
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }
  }

  public Winner(): string {
    if (this.isRowWinner(0)) return this._board.TileAt(0, 0).Symbol;
    if (this.isRowWinner(1)) return this._board.TileAt(1, 0).Symbol;
    if (this.isRowWinner(2)) return this._board.TileAt(2, 0).Symbol;

    return ' ';
  }

  private isRowWinner(row: number): boolean {
    const a = this._board.TileAt(row, 0).Symbol;
    const b = this._board.TileAt(row, 1).Symbol;
    const c = this._board.TileAt(row, 2).Symbol;

    return a != ' ' && a == b && b == c;
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
        this._plays.push({ X: i, Y: j, Symbol: ' ' });
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this.TileAt(x, y).Symbol = symbol;
  }
}
