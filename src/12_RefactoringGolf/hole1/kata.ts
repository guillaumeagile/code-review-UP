export class Game {
  private readonly playerO = "O";
  private readonly emptyPlay = " ";

  private _lastSymbol = this.emptyPlay;
  private _board: Board = new Board();


  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == this.emptyPlay && player == this.playerO) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != this.emptyPlay) {
      throw new Error("Invalid position");
    }
  }

  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      const symbol = this._board.TileAt(row, 0).Symbol;
      if (
        symbol != this.emptyPlay &&
        this._board.TileAt(row, 1).Symbol == symbol &&
        this._board.TileAt(row, 2).Symbol == symbol
      ) {
        return symbol;
      }
    }
    return this.emptyPlay;
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
        this._plays.push({ X: i, Y: j, Symbol: " " });
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
