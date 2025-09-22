/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  private readonly emptyPlay = ' ';

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == this.emptyPlay) {
      if (player == 'O') {
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
    if (this._board.TileAt(x, y).Symbol != this.emptyPlay) {
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
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      if (this.isRowFull(rowIndex) && this.isRowFullWithSameSymbol(rowIndex)) {
        return this._board.TileAt(rowIndex, 0)!.Symbol;
      }
    }
    return this.emptyPlay;
  }

  private isRowFull(rowIndex: number) {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      if (this._board.TileAt(rowIndex, columnIndex)!.Symbol == this.emptyPlay) {
        return false;
      }
    }
    return true;
  }

  private isRowFullWithSameSymbol(rowIndex: number) {
    const firstSymbol = this._board.TileAt(rowIndex, 0)!.Symbol;
    return (
      this._board.TileAt(rowIndex, 1)!.Symbol == firstSymbol &&
      this._board.TileAt(rowIndex, 2)!.Symbol == firstSymbol
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
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  private findTile(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public TileAt(x: number, y: number): Tile {
    return this.findTile(x, y);
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this.findTile(x, y)!.Symbol = symbol;
  }
}
