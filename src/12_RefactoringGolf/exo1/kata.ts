/* eslint-disable */

// read the code
export class Game {
  private _lastSymbol = ' ';
  private _toto: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayerTurn(symbol);
    this.validatePosition(x, y);

    this._lastSymbol = symbol;
    this._toto.AddTileAt(symbol, x, y);
  }

  private validateFirstMove(symbol: string): void {
    if (this._lastSymbol == ' ') {
      if (symbol == 'O') {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayerTurn(symbol: string): void {
    if (symbol == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePosition(x: number, y: number): void {
    if (this._toto.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }
  }

  public Winner(): string {
    const firstRowWinner = this.checkRowWinner(0);
    if (firstRowWinner !== ' ') {
      return firstRowWinner;
    }

    const middleRowWinner = this.checkRowWinner(1);
    if (middleRowWinner !== ' ') {
      return middleRowWinner;
    }

    const bottomRowWinner = this.checkRowWinner(2);
    if (bottomRowWinner !== ' ') {
      return bottomRowWinner;
    }

    return ' ';
  }

  private checkRowWinner(row: number): string {
    if (
      this._toto.TileAt(row, 0)!.Symbol != ' ' &&
      this._toto.TileAt(row, 1)!.Symbol != ' ' &&
      this._toto.TileAt(row, 2)!.Symbol != ' '
    ) {
      if (
        this._toto.TileAt(row, 0)!.Symbol == this._toto.TileAt(row, 1)!.Symbol &&
        this._toto.TileAt(row, 2)!.Symbol == this._toto.TileAt(row, 1)!.Symbol
      ) {
        return this._toto.TileAt(row, 0)!.Symbol;
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
    this.initializeBoard();
  }

  private initializeBoard(): void {
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
    const tile = this.findTileAt(x, y);
    tile.Symbol = symbol;
  }

  private findTileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }
}
// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review