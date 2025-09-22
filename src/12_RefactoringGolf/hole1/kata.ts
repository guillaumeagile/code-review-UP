/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  private static readonly PLAYER_O = 'O';
  private static readonly EMPTY_PLAY = ' ';

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol === Game.EMPTY_PLAY && player === Game.PLAYER_O) {
      throw new Error('Invalid first player');
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol !== Game.EMPTY_PLAY) {
      throw new Error('Invalid position');
    }
  }

  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0)!.Symbol;
      }
    }
    return Game.EMPTY_PLAY;
  }

  private isRowFull(row: number): boolean {
    for (let col = 0; col < 3; col++) {
      if (this._board.TileAt(row, col)!.Symbol === Game.EMPTY_PLAY) {
        return false;
      }
    }
    return true;
  }

  private isRowFullWithSameSymbol(row: number): boolean {
    const symbol = this._board.TileAt(row, 0)!.Symbol;
    return (
      symbol === this._board.TileAt(row, 1)!.Symbol &&
      symbol === this._board.TileAt(row, 2)!.Symbol
    );
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