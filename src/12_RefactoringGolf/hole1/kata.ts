/* eslint-disable */

// améliore ce code
export class Game {
  private _lastSymbol = ' ';
  private _toto: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.valideFirstMove(symbol);
    this.valideNotRepeated(symbol);
    this.validePlacePlayed(x, y);

    this.updateGameState(symbol, x, y);
  }

  private valideFirstMove(symbol: string): void {
    if (this._lastSymbol == ' ') {
      if (symbol == 'O') {
        throw new Error('Invalid first player');
      }
    }
  }

  private valideNotRepeated(symbol: string): void {
      if (symbol == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validePlacePlayed(x : number, y : number): void {
    if (this._toto.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }
  }

  private updateGameState(symbol: string, x: number, y: number): void {
    this._lastSymbol = symbol;
    this._toto.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    if (this.firstRowFull()) {
      if (this.firstRowFullSameSymbol()) {
        return this._toto.TileAt(0, 0)!.Symbol;
      }
    }

    if (this.middleRowFull()) {
      if (this.middleRowFullSameSymbol()) {
        return this._toto.TileAt(1, 0)!.Symbol;
      }
    }

    if (this.bottomRowFull()) {
      if (this.bottomRowFullSameSymbol()) {
        return this._toto.TileAt(2, 0)!.Symbol;
      }
    }

    return ' ';
  }

  private firstRowFull(): boolean {
    return (
      this._toto.TileAt(0, 0)!.Symbol != ' ' &&
      this._toto.TileAt(0, 1)!.Symbol != ' ' &&
      this._toto.TileAt(0, 2)!.Symbol != ' '
    );
  }

  private middleRowFull(): boolean {
    return (
      this._toto.TileAt(1, 0)!.Symbol != ' ' &&
      this._toto.TileAt(1, 1)!.Symbol != ' ' &&
      this._toto.TileAt(1, 2)!.Symbol != ' '
    );
  }

  private bottomRowFull(): boolean {
    return (
      this._toto.TileAt(2, 0)!.Symbol != ' ' &&
      this._toto.TileAt(2, 1)!.Symbol != ' ' &&
      this._toto.TileAt(2, 2)!.Symbol != ' '
    );
  }

  private firstRowFullSameSymbol(): boolean {
    return (
      this._toto.TileAt(0, 0)!.Symbol == this._toto.TileAt(0, 1)!.Symbol &&
      this._toto.TileAt(0, 2)!.Symbol == this._toto.TileAt(0, 1)!.Symbol
    );
  }

  private middleRowFullSameSymbol(): boolean {
    return (
      this._toto.TileAt(1, 0)!.Symbol == this._toto.TileAt(1, 1)!.Symbol &&
      this._toto.TileAt(1, 2)!.Symbol == this._toto.TileAt(1, 1)!.Symbol
    );
  }

  private bottomRowFullSameSymbol(): boolean {
    return (
      this._toto.TileAt(2, 0)!.Symbol == this._toto.TileAt(2, 1)!.Symbol &&
      this._toto.TileAt(2, 2)!.Symbol == this._toto.TileAt(2, 1)!.Symbol
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

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
