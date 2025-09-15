/* eslint-disable */

export class Game {
  private _lastSymbol = " ";
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    if (this.isFirstMove()) {
      this.validateFirstPlayer(symbol);
    } else {
      this.validatePlayerRotation(symbol);
      this.validatePosition(x, y);
    }

    this.updateGameState(symbol, x, y);
  }

  private isFirstMove(): boolean {
    return this._lastSymbol == " ";
  }

  private validateFirstPlayer(symbol: string): void {
    if (symbol == "O") {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayerRotation(symbol: string): void {
    if (symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePosition(x: number, y: number): void {
    if (this._board.TileAt(x, y).Symbol != " ") {
      throw new Error("Invalid position");
    }
  }

  private updateGameState(symbol: string, x: number, y: number) {
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    return this.checkRowWinner();
  }

  private checkRowWinner(): string {
    for (let row = 0; row < 3; row++) {
      const winner = this.checkRowWinnerAt(row);
      if (winner != " ") {
        return winner;
      }
    }
    return " ";
  }

  private checkRowWinnerAt(row: number): string {
    if (this.isRowFull(row) && this.isRowSameSymbol(row)) {
      return this._board.TileAt(row, 0)!.Symbol;
    }
    return " ";
  }

  private isRowFull(row: number): boolean {
    return (
      this._board.TileAt(row, 0)!.Symbol != " " &&
      this._board.TileAt(row, 1)!.Symbol != " " &&
      this._board.TileAt(row, 2)!.Symbol != " "
    );
  }

  private isRowSameSymbol(row: number): boolean {
    return (
      this._board.TileAt(row, 0)!.Symbol == this._board.TileAt(row, 1)!.Symbol &&
      this._board.TileAt(row, 2)!.Symbol == this._board.TileAt(row, 1)!.Symbol
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
        const tile: Tile = { X: i, Y: j, Symbol: " " };
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
