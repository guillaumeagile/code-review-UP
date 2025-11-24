import { Board } from './board';
import { EMPTY_SYMBOL, PLAYER_O, BOARD_SIZE } from './constants';

export class Game {
  private _lastSymbol = EMPTY_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol === EMPTY_SYMBOL) {
      if (player === PLAYER_O) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol !== EMPTY_SYMBOL) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0)!.Symbol;
      }
    }
    return EMPTY_SYMBOL;
  }

  private isRowFull(row: number): boolean {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (this._board.TileAt(row, col)!.Symbol === EMPTY_SYMBOL) {
        return false;
      }
    }
    return true;
  }

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
