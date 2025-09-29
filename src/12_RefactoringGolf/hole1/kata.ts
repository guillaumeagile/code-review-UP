/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  private readonly playerO = 'O';
  private readonly emptyPlay = ' ';

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol === this.emptyPlay && player === this.playerO) {
      throw new Error('Invalid first player');
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol !== this.emptyPlay) {
      throw new Error('Invalid position');
    }
  }

  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0).Symbol;
      }
    }
    return this.emptyPlay;
  }

  private isRowFull(row: number): boolean {
    return [0, 1, 2].every(
      col => this._board.TileAt(row, col).Symbol !== this.emptyPlay
    );
  }

  private isRowFullWithSameSymbol(row: number): boolean {
    const [first, second, third] = [0, 1, 2].map(col =>
      this._board.TileAt(row, col).Symbol
    );
    return first === second && second === third;
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
    return this._plays.find((t: Tile) => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this.TileAt(x, y).Symbol = symbol;
  }
}