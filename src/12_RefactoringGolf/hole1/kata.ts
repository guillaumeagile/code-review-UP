/* eslint-disable */

// Domain: allowed grid positions (primitive obsession removed)
export enum Position {
  ZERO = 0,
  ONE = 1,
  TWO = 2
}

// Conversion helper to remain compatible with tests using numbers
export function toPosition(n: number): Position {
  if (n !== 0 && n !== 1 && n !== 2) {
    throw new Error("Invalid position");
  }
  return n as Position;
}

const playerO = "O";
const noPlayer = " ";

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  /**
   * Original API still accepts numbers because tests use numbers.
   * Internally, we convert to our new typed Position value object.
   */
  public Play(player: string, x: number, y: number): void {
    const posX = toPosition(x);
    const posY = toPosition(y);

    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(posX, posY);

    this.updateLastPlayer(player);
    this.updateBoard(new Tile(posX, posY, player));
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == noPlayer && player == playerO) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: Position, y: Position) {
    if (this._board.isTilePlayedAt(x, y)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  constructor(
      private x: Position,
      private y: Position,
      private player: string = noPlayer
  ) {}

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x === other.x && this.y === other.y;
  }

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    // Initialize all 9 squares
    for (let x of [Position.ZERO, Position.ONE, Position.TWO]) {
      for (let y of [Position.ZERO, Position.ONE, Position.TWO]) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public isTilePlayedAt(x: Position, y: Position) {
    return this.findTileAt(x, y)!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this.findTileAt(tile["x"], tile["y"])!.updatePlayer(tile.Player);
  }

  private findTileAt(x: Position, y: Position) {
    return this._plays.find(
        (t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer))
    )!;
  }

  public findRowFullWithSamePlayer(): string {
    for (const row of [Position.ZERO, Position.ONE, Position.TWO]) {
      if (this.isRowFull(row) && this.isRowFullWithSamePlayer(row)) {
        return this.playerAt(row, Position.ZERO);
      }
    }
    return noPlayer;
  }

  private playerAt(x: Position, y: Position) {
    return this.findTileAt(x, y)!.Player;
  }

  private isRowFull(row: Position) {
    return (
        this.isTilePlayedAt(row, Position.ZERO) &&
        this.isTilePlayedAt(row, Position.ONE) &&
        this.isTilePlayedAt(row, Position.TWO)
    );
  }

  private isRowFullWithSamePlayer(row: Position) {
    return (
        this.hasSamePlayer(row, Position.ZERO, row, Position.ONE) &&
        this.hasSamePlayer(row, Position.ONE, row, Position.TWO)
    );
  }

  private hasSamePlayer(
      x1: Position,
      y1: Position,
      x2: Position,
      y2: Position
  ) {
    return (
        this.findTileAt(x1, y1)!.hasSamePlayerAs(
            this.findTileAt(x2, y2)!
        )
    );
  }
}
