
const EMPTY_TILE: string = ' ';

export class Game {
  private readonly DEFAULT_LAST_SYMBOL = ' ';
  private readonly SYMBOL_PLAYER_O = 'O';

  private readonly COLUMN_0 = 0;
  private readonly COLUMN_1 = 1;
  private readonly COLUMN_2 = 2;
  private readonly ROW_0 = 0;
  private readonly ROW_1 = 1;
  private readonly ROW_2 = 2;


  private _lastSymbol = this.DEFAULT_LAST_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == EMPTY_TILE) {
      if (player == this.SYMBOL_PLAYER_O) {
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
    if (this._board.TileAt(x, y).Symbol != EMPTY_TILE) {
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
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(this.ROW_0, this.COLUMN_0)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(this.ROW_1, this.COLUMN_0)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(this.ROW_2, this.COLUMN_0)!.Symbol;
    }

    return EMPTY_TILE;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(this.ROW_0, this.COLUMN_0)!.Symbol != EMPTY_TILE &&
      this._board.TileAt(this.ROW_0, this.COLUMN_1)!.Symbol != EMPTY_TILE &&
      this._board.TileAt(this.ROW_0, this.COLUMN_2)!.Symbol != EMPTY_TILE
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.ROW_0, this.COLUMN_0)!.Symbol == this._board.TileAt(this.ROW_0, this.COLUMN_1)!.Symbol &&
      this._board.TileAt(this.ROW_0, this.COLUMN_1)!.Symbol == this._board.TileAt(this.ROW_0, this.COLUMN_2)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(this.ROW_1, this.COLUMN_0)!.Symbol != EMPTY_TILE &&
      this._board.TileAt(this.ROW_1, this.COLUMN_1)!.Symbol != EMPTY_TILE &&
      this._board.TileAt(this.ROW_1, this.COLUMN_2)!.Symbol != EMPTY_TILE
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.ROW_1, this.COLUMN_0)!.Symbol == this._board.TileAt(this.ROW_1, this.COLUMN_1)!.Symbol &&
      this._board.TileAt(this.ROW_1, this.COLUMN_1)!.Symbol == this._board.TileAt(this.ROW_1, this.COLUMN_2)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(this.ROW_2, this.COLUMN_0)!.Symbol != EMPTY_TILE &&
      this._board.TileAt(this.ROW_2, this.COLUMN_1)!.Symbol != EMPTY_TILE &&
      this._board.TileAt(this.ROW_2, this.COLUMN_2)!.Symbol != EMPTY_TILE
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.ROW_2, this.COLUMN_0)!.Symbol == this._board.TileAt(this.ROW_2, this.COLUMN_1)!.Symbol &&
      this._board.TileAt(this.ROW_2, this.COLUMN_1)!.Symbol == this._board.TileAt(this.ROW_2, this.COLUMN_2)!.Symbol
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
        const tile: Tile = { X: i, Y: j, Symbol: EMPTY_TILE};
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
