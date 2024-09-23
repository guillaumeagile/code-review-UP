/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    if (this._lastSymbol == ' ') {
      if (symbol == 'O') {
        throw new Error('Invalid first player');
      }
    }
    else if (symbol == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
    else if (this._board.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    for (let i=0;i<3;i++) {
      if (
          this._board.TileAt(i, 0)!.Symbol != ' ' &&
          this._board.TileAt(i, 1)!.Symbol != ' ' &&
          this._board.TileAt(i, 2)!.Symbol != ' '
      ) {
        //if first row is full with same symbol
        if (
            this._board.TileAt(i, 0)!.Symbol == this._board.TileAt(i, 1)!.Symbol &&
            this._board.TileAt(i, 2)!.Symbol == this._board.TileAt(i, 1)!.Symbol
        ) {
          return this._board.TileAt(i, 0)!.Symbol;
        }
      }
    }

    return ' ';
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

  public AddTileAt(symbol: string, x: number, y: number): void {     //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
