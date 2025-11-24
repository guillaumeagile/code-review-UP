import {Board} from "./Board";

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  private readonly playerO = 'O';
  private readonly emptyPlay = ' ';

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == this.emptyPlay) {
      if (player == this.playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != this.emptyPlay) {
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
    for (let row = 0; row < 3; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0)!.Symbol;
      }
    }
    return this.emptyPlay;
  }

  private isRowFull(row: number) {
    return (
        this._board.TileAt(row, 0)!.Symbol != this.emptyPlay &&
        this._board.TileAt(row, 1)!.Symbol != this.emptyPlay &&
        this._board.TileAt(row, 2)!.Symbol != this.emptyPlay
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
        this._board.TileAt(row, 0)!.Symbol == this._board.TileAt(row, 1)!.Symbol &&
        this._board.TileAt(row, 2)!.Symbol == this._board.TileAt(row, 1)!.Symbol
    );
  }
}