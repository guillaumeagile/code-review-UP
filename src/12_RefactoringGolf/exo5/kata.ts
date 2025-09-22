const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const emptyPlay = " ";

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != emptyPlay) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
  hasSameSymbolAs(other: Tile): boolean;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: emptyPlay, hasSameSymbolAs: function (other: Tile): boolean {
          return this.Symbol == other.Symbol;
        } };
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

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    const emptyTile: Tile = { X: -1, Y: -1, Symbol: emptyPlay, hasSameSymbolAs: function (other: Tile): boolean {
      return this.Symbol == other.Symbol;
    } };
    return (
      !this.TileAt(row, firstColumn)!.hasSameSymbolAs(emptyTile) &&
      !this.TileAt(row, secondColumn)!.hasSameSymbolAs(emptyTile) &&
      !this.TileAt(row, thirdColumn)!.hasSameSymbolAs(emptyTile)
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.TileAt(row, firstColumn)!.hasSameSymbolAs(this.TileAt(row, secondColumn)!) &&
      this.TileAt(row, thirdColumn)!.hasSameSymbolAs(this.TileAt(row, firstColumn)!)
    );
  }
}
