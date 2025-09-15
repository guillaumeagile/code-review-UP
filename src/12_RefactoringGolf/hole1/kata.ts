/* eslint-disable */

export class Game {
  private static readonly PLAYER_O = 'O';
  private static readonly EMPTY_PLAY = ' ';

  private _lastSymbol = Game.EMPTY_PLAY;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol === Game.EMPTY_PLAY) {
      if (player === Game.PLAYER_O) {
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
    if (this._board.TileAt(x, y).Symbol !== Game.EMPTY_PLAY) {
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
    for (let row = 0; row < Board.BOARD_SIZE; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0)!.Symbol;
      }
    }

    return Game.EMPTY_PLAY;
  }

  private isRowFull(row: number) {
    for (let col = 0; col < Board.BOARD_SIZE; col++) {
      if (this._board.TileAt(row, col)!.Symbol === Game.EMPTY_PLAY) {
        return false;
      }
    }
    return true;
  }

  private isRowFullWithSameSymbol(row: number) {
    const first = this._board.TileAt(row, 0)!.Symbol;
    const second = this._board.TileAt(row, 1)!.Symbol;
    const third = this._board.TileAt(row, 2)!.Symbol;

    return first === second && second === third;
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  public static readonly BOARD_SIZE = 3;
  private static readonly EMPTY_PLAY = ' ';

  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < Board.BOARD_SIZE; i++) {
      for (let j = 0; j < Board.BOARD_SIZE; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: Board.EMPTY_PLAY };
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