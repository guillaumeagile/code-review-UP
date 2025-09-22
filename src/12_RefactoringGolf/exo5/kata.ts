// === Constants ===
const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

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
    if (this._lastSymbol === emptyPlay) {
      if (player === playerO) {
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
    if (!this._board.TileAt(x, y).isEmpty()) {
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
    return this._board.findRowFullWithSamePlayer();
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
  isEmpty(): boolean;
  hasSameSymbolAs(other: Tile): boolean;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        const tile: Tile = new TileImpl(i, j, emptyPlay);
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t) => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this.TileAt(x, y).Symbol = symbol;
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.TileAt(firstRow, firstColumn).Symbol;
    }
    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.TileAt(secondRow, firstColumn).Symbol;
    }
    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.TileAt(thirdRow, firstColumn).Symbol;
    }
    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      !this.TileAt(row, firstColumn).isEmpty() &&
      !this.TileAt(row, secondColumn).isEmpty() &&
      !this.TileAt(row, thirdColumn).isEmpty()
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.TileAt(row, firstColumn).hasSameSymbolAs(this.TileAt(row, secondColumn)) &&
      this.TileAt(row, thirdColumn).hasSameSymbolAs(this.TileAt(row, secondColumn))
    );
  }
}

// === Implémentation de Tile avec méthodes ===
class TileImpl implements Tile {
  constructor(public X: number, public Y: number, public Symbol: string) {}

  public isEmpty(): boolean {
    return this.Symbol === emptyPlay;
  }

  public hasSameSymbolAs(other: Tile): boolean {
    return this.Symbol === other.Symbol;
  }
}
