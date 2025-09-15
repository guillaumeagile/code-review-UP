
const emptySymbole = " ";
const playerX = "X";
const playerO = "O";

const invalidPlayerError = "Invalid next player";
const invalidFirstPlayerError = "Invalid first player";
const invalidPositionError = "Invalid position";

export class Game {
  private _lastSymbol = emptySymbole;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptySymbole) {
      if (player == playerO) {
        throw new Error(invalidFirstPlayerError);
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error(invalidPlayerError);
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != emptySymbole) {
      throw new Error(invalidPositionError);
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(0, 0)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(1, 0)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(2, 0)!.Symbol;
    }

    return " ";
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(0, 0)!.Symbol != emptySymbole &&
      this._board.TileAt(0, 1)!.Symbol != emptySymbole &&
      this._board.TileAt(0, 2)!.Symbol != emptySymbole
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(0, 0)!.Symbol == this._board.TileAt(0, 1)!.Symbol &&
      this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(1, 0)!.Symbol != emptySymbole &&
      this._board.TileAt(1, 1)!.Symbol != emptySymbole &&
      this._board.TileAt(1, 2)!.Symbol != emptySymbole
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(1, 0)!.Symbol == this._board.TileAt(1, 1)!.Symbol &&
      this._board.TileAt(1, 2)!.Symbol == this._board.TileAt(1, 1)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(2, 0)!.Symbol != emptySymbole &&
      this._board.TileAt(2, 1)!.Symbol != emptySymbole &&
      this._board.TileAt(2, 2)!.Symbol != emptySymbole
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(2, 0)!.Symbol == this._board.TileAt(2, 1)!.Symbol &&
      this._board.TileAt(2, 2)!.Symbol == this._board.TileAt(2, 1)!.Symbol
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
        const tile: Tile = { X: i, Y: j, Symbol: emptySymbole };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
