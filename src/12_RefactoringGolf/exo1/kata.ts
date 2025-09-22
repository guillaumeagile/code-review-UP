/* eslint-disable */

// read the code
export class Game {
  private lastSymbol = ' ';
  private board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateMove(symbol, x, y);
    this.makeMove(symbol, x, y);
  }

  private validateMove(symbol: string, x: number, y: number): void {
    if (this.isFirstMove()) {
      this.validateFirstMove(symbol);
    } else {
      this.validateSubsequentMove(symbol, x, y);
    }
  }

  private isFirstMove(): boolean {
    return this.lastSymbol === " ";
  }

  private validateFirstMove(symbol: string): void {
    if (symbol === "O") {
      throw new Error("Invalid first player");
    }
  }

  private validateSubsequentMove(symbol: string, x: number, y: number): void {
    if (symbol === this.lastSymbol) {
      throw new Error("Invalid next player");
    }
    if (this.board.TileAt(x, y).Symbol !== " ") {
      throw new Error("Invalid position");
    }
  }

  private makeMove(symbol: string, x: number, y: number): void {
    this.lastSymbol = symbol;
    this.board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    // Check all rows
    for (let row = 0; row < 3; row++) {
      if (this.isWinningRow(row)) {
        return this.board.TileAt(row, 0).Symbol;
      }
    }
    return " ";
  }

  private isWinningRow(row: number): boolean {
    const first = this.board.TileAt(row, 0).Symbol;
    const second = this.board.TileAt(row, 1).Symbol;
    const third = this.board.TileAt(row, 2).Symbol;

    return first !== " " && first === second && second === third;
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
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review