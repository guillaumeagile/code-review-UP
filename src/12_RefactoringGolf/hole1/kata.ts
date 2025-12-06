/* eslint-disable */

const EMPTY = " ";
const PLAYER_O = "O";

export class Game {
  private lastSymbol = EMPTY;
  private board = new Board();

  /**
   * Main entry point: validates move then updates state.
   */
  public Play(symbol: string, x: number, y: number): void {
    if (this.lastSymbol === EMPTY && symbol === PLAYER_O)
      throw new Error("Invalid first player"); // O cannot start

    if (symbol === this.lastSymbol)
      throw new Error("Invalid next player"); // same player twice

    if (this.board.isOccupied(x, y))
      throw new Error("Invalid position"); // tile already used

    this.lastSymbol = symbol;
    this.board.place(symbol, x, y);
  }

  /** Winner detection delegated to board */
  public Winner(): string {
    return this.board.findWinnerRow();
  }
}

/**
 * Tile class is simplified: no need to store x,y  independently.
 * The board grid stores its own coordinate.
 */
class Tile {
  constructor(public symbol: string = EMPTY) {}

  get isNotEmpty() {
    return this.symbol !== EMPTY;
  }

  updateSymbol(s: string) {
    this.symbol = s;
  }
}

/**
 * Board refactored to a 3×3 matrix instead of a flat list of Tiles.
 * This removes the need for coordinate matching logic and makes code shorter.
 */
class Board {
  private grid: Tile[][];

  constructor() {
    // Create a 3×3 Tile grid
    this.grid = Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => new Tile())
    );
  }

  public isOccupied(x: number, y: number): boolean {
    // @ts-ignore
    return this.grid[x][y].isNotEmpty;
  }

  public place(symbol: string, x: number, y: number): void {
    // @ts-ignore
    this.grid[x][y].updateSymbol(symbol);
  }

  /**
   * Refactored winner detection:
   * - loop rows instead of manually checking first/middle/last row
   * - early return on winner
   */
  public findWinnerRow(): string {
    for (let r = 0; r < 3; r++) {
      // @ts-ignore
      const [a, b, c] = this.grid[r];
      if (a.isNotEmpty && a.symbol === b.symbol && b.symbol === c.symbol) {
        return a.symbol;
      }
    }
    return EMPTY;
  }
}