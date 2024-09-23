const BOARD_SIZE = 3;

export class Game {
  private _lastPlayer = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer === ' ' && player === 'O') {
      throw new Error('Invalid first player');
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastPlayer) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.getTile(x, y).symbol !== ' ') {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.setTile(player, x, y);
  }

  public Winner(): string {
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (this.isRowFull(row) && this.isRowUniform(row)) {
        return this._board.getTile(row, 0)!.symbol;
      }
    }

    for (let col = 0; col < BOARD_SIZE; col++) {
      if (this.isColumnFull(col) && this.isColumnUniform(col)) {
        return this._board.getTile(0, col)!.symbol;
      }
    }

    if (this.isDiagonalFull() && this.isDiagonalUniform()) {
      return this._board.getTile(0, 0)!.symbol;
    }

    if (this.isAntiDiagonalFull() && this.isAntiDiagonalUniform()) {
      return this._board.getTile(0, BOARD_SIZE - 1)!.symbol;
    }

    return ' ';
  }

  private isRowFull(row: number): boolean {
    return this._board.getTile(row, 0)!.symbol !== ' ' &&
           this._board.getTile(row, 1)!.symbol !== ' ' &&
           this._board.getTile(row, 2)!.symbol !== ' ';
  }

  private isRowUniform(row: number): boolean {
    return this._board.getTile(row, 0)!.symbol === this._board.getTile(row, 1)!.symbol &&
           this._board.getTile(row, 1)!.symbol === this._board.getTile(row, 2)!.symbol;
  }

  private isColumnFull(col: number): boolean {
    return this._board.getTile(0, col)!.symbol !== ' ' &&
           this._board.getTile(1, col)!.symbol !== ' ' &&
           this._board.getTile(2, col)!.symbol !== ' ';
  }

  private isColumnUniform(col: number): boolean {
    return this._board.getTile(0, col)!.symbol === this._board.getTile(1, col)!.symbol &&
           this._board.getTile(1, col)!.symbol === this._board.getTile(2, col)!.symbol;
  }

  private isDiagonalFull(): boolean {
    return this._board.getTile(0, 0)!.symbol !== ' ' &&
           this._board.getTile(1, 1)!.symbol !== ' ' &&
           this._board.getTile(2, 2)!.symbol !== ' ';
  }

  private isDiagonalUniform(): boolean {
    return this._board.getTile(0, 0)!.symbol === this._board.getTile(1, 1)!.symbol &&
           this._board.getTile(1, 1)!.symbol === this._board.getTile(2, 2)!.symbol;
  }

  private isAntiDiagonalFull(): boolean {
    return this._board.getTile(0, 2)!.symbol !== ' ' &&
           this._board.getTile(1, 1)!.symbol !== ' ' &&
           this._board.getTile(2, 0)!.symbol !== ' ';
  }

  private isAntiDiagonalUniform(): boolean {
    return this._board.getTile(0, 2)!.symbol === this._board.getTile(1, 1)!.symbol &&
           this._board.getTile(1, 1)!.symbol === this._board.getTile(2, 0)!.symbol;
  }
}

interface Tile {
  x: number;
  y: number;
  symbol: string;
}

class Board {
  private _tiles: Tile[] = [];

  constructor() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        this._tiles.push({ x: i, y: j, symbol: ' ' });
      }
    }
  }

  public getTile(x: number, y: number): Tile {
    return this._tiles.find(tile => tile.x === x && tile.y === y)!;
  }

  public setTile(symbol: string, x: number, y: number): void {
    this.getTile(x, y).symbol = symbol;
  }
}
