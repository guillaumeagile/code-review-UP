/* eslint-disable */

// read the code
export class Game {
  private _lastSymbol = " ";
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    //if first move
    if (this._lastSymbol == " ") {
      //if player is X
      if (symbol == "O") {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.TileAt(x, y).Symbol != " ") {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    for(let i = 0; i < 3; i++) {
      if (
        this._isInXRow(i) &&
        this._isRowFull(i)
      ) {
          return this._board.TileAt(i, 0)!.Symbol;
      }
    }
    return " ";
  }

  private _isInXRow(x: number): boolean {
    return this._board.TileAt(x, 0)!.Symbol != " " &&
    this._board.TileAt(x, 1)!.Symbol != " " &&
    this._board.TileAt(x, 2)!.Symbol != " "
  }

  private _isRowFull(x: number): boolean {
    return this._board.TileAt(x, 0)!.Symbol == this._board.TileAt(x, 1)!.Symbol &&
    this._board.TileAt(x, 2)!.Symbol == this._board.TileAt(x, 1)!.Symbol
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _gameTiles: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: " " };
        this._gameTiles.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._gameTiles.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._gameTiles.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review
