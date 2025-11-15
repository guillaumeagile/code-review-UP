/* eslint-disable */

const BOARD_SIZE = 3;        // Avoid magic number "3" used everywhere
const EMPTY_SYMBOL = ' ';    // Avoid magic string " " repeated in many places

export class Game {
  private _lastSymbol = EMPTY_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    // Extracted validations into clearer, single-responsibility methods
    this.validateFirstMove(symbol);
    this.validatePlayerTurn(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  // ----------------------------------------------
  // VALIDATIONS (Refactored naming + clarity)
  // ----------------------------------------------
  private validateFirstMove(player: string): void {
    const isFirstMove = this._lastSymbol === EMPTY_SYMBOL;
    // FIX: clearer condition + removed nested logic smell
    if (isFirstMove && player === 'O') {
      throw new Error('Invalid first player');
    }
  }

  private validatePlayerTurn(player: string): void {
    // FIX: renamed from validatePlayer() to be explicit
    if (player === this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number): void {
    // FIX: removed magic string comparison, now uses EMPTY_SYMBOL
    if (this._board.TileAt(x, y).Symbol !== EMPTY_SYMBOL) {
      throw new Error('Invalid position');
    }
  }

  // ----------------------------------------------
  // STATE UPDATES
  // ----------------------------------------------
  private updateLastPlayer(player: string): void {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number): void {
    this._board.AddTileAt(player, x, y);
  }


  // -------------------------------------------------------------
  // WINNER CHECK - Main part that needed real refactoring
  // -------------------------------------------------------------
  //
  // BEFORE:
  //   - 6 methods duplicated:
  //       isFirstRowFull(), isFirstRowFullWithSameSymbol(), ...
  //   - Each row had its own "full" and "same symbol" method
  //   - Massive code duplication (classic smell: Duplicated Code)
  //
  // AFTER:
  //   - Single method isRowWinner(row)
  //   - Single loop over rows
  //   - Clearer intentions & reduced complexity
  //
  // -------------------------------------------------------------
  public Winner(): string {
    // Loop through each row instead of 3 hardcoded copies
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (this.isRowWinner(row)) {
        return this._board.TileAt(row, 0).Symbol;
      }
    }

    // No winner
    return EMPTY_SYMBOL;
  }

  private isRowWinner(row: number): boolean {
    // "Winner" means: row full + all symbols identical
    return this.isRowFull(row) && this.isRowFullWithSameSymbol(row);
  }

  private isRowFull(row: number): boolean {
    // Generic full-row check (instead of 3 separate functions)
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (this._board.TileAt(row, col).Symbol === EMPTY_SYMBOL) {
        return false;
      }
    }
    return true;
  }

  private isRowFullWithSameSymbol(row: number): boolean {
    // Generic equality check for rows (no more duplication)
    const referenceSymbol = this._board.TileAt(row, 0).Symbol;

    for (let col = 1; col < BOARD_SIZE; col++) {
      if (this._board.TileAt(row, col).Symbol !== referenceSymbol) {
        return false;
      }
    }

    return true;
  }
}

// ========================================================================
// BOARD CLASS
// ========================================================================
interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    // FIX: removed magic numbers, now uses BOARD_SIZE constant
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        const tile: Tile = { X: x, Y: y, Symbol: EMPTY_SYMBOL };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    const tile = this.TileAt(x, y);
    tile.Symbol = symbol;
  }
}
