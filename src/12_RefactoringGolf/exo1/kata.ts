/* eslint-disable */

// lecture du code dans github
export class Game {
  private _lastSymbol = ' ';
  private _toto: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    //if first move
    if (this._lastSymbol == ' ') {
      //if player is X
      if (symbol == 'O') {
        throw new Error('Invalid first player');
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
    //if not first move but play on an already played tile
    else if (this._toto.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }

    // update game state
    this._lastSymbol = symbol;
    this._toto.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    //if the positions in first row are taken
    if (
      this._toto.TileAt(0, 0)!.Symbol != ' ' &&
      this._toto.TileAt(0, 1)!.Symbol != ' ' &&
      this._toto.TileAt(0, 2)!.Symbol != ' '
    ) {
      //if first row is full with same symbol
      if (
        this._toto.TileAt(0, 0)!.Symbol == this._toto.TileAt(0, 1)!.Symbol &&
        this._toto.TileAt(0, 2)!.Symbol == this._toto.TileAt(0, 1)!.Symbol
      ) {
        return this._toto.TileAt(0, 0)!.Symbol;
      }
    }

    //if the positions in first row are taken
    if (
      this._toto.TileAt(1, 0)!.Symbol != ' ' &&
      this._toto.TileAt(1, 1)!.Symbol != ' ' &&
      this._toto.TileAt(1, 2)!.Symbol != ' '
    ) {
      //if middle row is full with same symbol
      if (
        this._toto.TileAt(1, 0)!.Symbol == this._toto.TileAt(1, 1)!.Symbol &&
        this._toto.TileAt(1, 2)!.Symbol == this._toto.TileAt(1, 1)!.Symbol
      ) {
        return this._toto.TileAt(1, 0)!.Symbol;
      }
    }

    //if the positions in first row are taken
    if (
      this._toto.TileAt(2, 0)!.Symbol != ' ' &&
      this._toto.TileAt(2, 1)!.Symbol != ' ' &&
      this._toto.TileAt(2, 2)!.Symbol != ' '
    ) {
      //if middle row is full with same symbol
      if (
        this._toto.TileAt(2, 0)!.Symbol == this._toto.TileAt(2, 1)!.Symbol &&
        this._toto.TileAt(2, 2)!.Symbol == this._toto.TileAt(2, 1)!.Symbol
      ) {
        return this._toto.TileAt(2, 0)!.Symbol;
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

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
// create a PR
// make your comments, then refactor
// submit your PR for review