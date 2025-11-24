import {Board} from "./Board";

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  private readonly playerO = 'O';
  private readonly emptyPlay = ' ';

  /**
   * Makes a play on the board
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
    if (this._lastSymbol == this.emptyPlay) {
      if (player == this.playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  /**
   * Validates that the same player does not play twice in a row
   * @param player
   * @private
   */
  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
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
    if (this._board.TileAt(x, y).Symbol != this.emptyPlay) {
      throw new Error('Invalid position');
    }
  }

  /**
   * Updates the last player who played
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
   * Determines the winner of the game
   * @constructor
   */
  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0)!.Symbol;
      }
    }
    return this.emptyPlay;
  }

  /**
   * Checks if a row is full
   * @param row
   * @private
   */
  private isRowFull(row: number) {
    return (
        this._board.TileAt(row, 0)!.Symbol != this.emptyPlay &&
        this._board.TileAt(row, 1)!.Symbol != this.emptyPlay &&
        this._board.TileAt(row, 2)!.Symbol != this.emptyPlay
    );
  }

  /**
   * Checks if a row is full with the same symbol
   * @param row
   * @private
   */
  private isRowFullWithSameSymbol(row: number) {
    return (
        this._board.TileAt(row, 0)!.Symbol == this._board.TileAt(row, 1)!.Symbol &&
        this._board.TileAt(row, 2)!.Symbol == this._board.TileAt(row, 1)!.Symbol
    );
  }
}