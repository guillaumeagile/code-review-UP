import { Board } from './board';
import { EMPTY_SYMBOL, PLAYER_O, BOARD_SIZE } from './constants';

export class Game {
  private _lastSymbol = EMPTY_SYMBOL;
  private _board: Board = new Board();

  /**
   * Allows a player to play at the given coordinates
   * @param symbol
   * @param x
   * @param y
   * @constructor
   */
  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);
    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  /**
   * Validates that the first move is made by player X
   * @param player
   * @private
   */
  private validateFirstMove(player: string) {
    if (this._lastSymbol === EMPTY_SYMBOL) {
      if (player === PLAYER_O) {
        throw new Error('Invalid first player');
      }
    }
  }

  /**
   * Validates that the player is not the same as the last player
   * @param player
   * @private
   */
  private validatePlayer(player: string) {
    if (player === this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  /**
   * Validates that the position is empty
   * @param x
   * @param y
   * @private
   */
  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol !== EMPTY_SYMBOL) {
      throw new Error('Invalid position');
    }
  }

  /**
   * Updates the last player
   * @param player
   * @private
   */
  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  /**
   * Updates the board with the player's move
   * @param player
   * @param x
   * @param y
   * @private
   */
  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  /**
   * Returns the winner of the game
   * @constructor
   */
  public Winner(): string {
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0)!.Symbol;
      }
    }
    return EMPTY_SYMBOL;
  }

  /**
   * Checks if a row is full
   * @param row
   * @private
   */
  private isRowFull(row: number): boolean {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (this._board.TileAt(row, col)!.Symbol === EMPTY_SYMBOL) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if a row is full of the same symbol
   * @param row
   * @private
   */
  private isRowFullWithSameSymbol(row: number): boolean {
    const first = this._board.TileAt(row, 0)!.Symbol;
    for (let col = 1; col < BOARD_SIZE; col++) {
      if (this._board.TileAt(row, col)!.Symbol !== first) {
        return false;
      }
    }
    return true;
  }
}
