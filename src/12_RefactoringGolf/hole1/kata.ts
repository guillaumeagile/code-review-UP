type Pos = 0 | 1 | 2;
type Player = "X" | "O" | " ";

const firstRow: Pos = 0;
const secondRow: Pos = 1;
const thirdRow: Pos = 2;
const firstColumn: Pos = 0;
const secondColumn: Pos = 1;
const thirdColumn: Pos = 2;

const playerO: Player = "O";
const noPlayer: Player = " ";


export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: Player, x: Pos, y: Pos): void {
    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(player);
    this.updateBoard(new Tile(x, y, player));
  }

  private validateFirstMove(player: Player) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: Player) {
    if (player == this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: Pos, y: Pos) {
    if (this._board.isTilePlayedAt(x, y)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: Player) {
    this._lastPlayer = player;
  }

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): Player {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: Pos = 0;
  private y: Pos = 0;
  private player: Player = noPlayer;

  constructor(x: Pos, y: Pos, player: Player) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

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
    return this.x == other.x && this.y == other.y;
  }

  updatePlayer(newPlayer: Player) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public isTilePlayedAt(x: Pos, y: Pos) {
    return this.findTileAt(new Tile(x, y, noPlayer))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this.findTileAt(tile)!.updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): Player {
    if (this.isRowFull(firstRow) && this.isRowFullWithSamePlayer(firstRow)) {
      return this.playerAt(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSamePlayer(secondRow)) {
      return this.playerAt(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSamePlayer(thirdRow)) {
      return this.playerAt(thirdRow, firstColumn);
    }

    return noPlayer;
  }

  private findTileAt(tile: Tile) {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile));
  }

  private hasSamePlayer(x: Pos, y: Pos, otherX: Pos, otherY: Pos) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: Pos, y: Pos) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(x: Pos, y: Pos): Tile {
    return this._plays.find((t: Tile) =>
      t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)),
    )!;
  }

  private isRowFull(row: Pos) {
    return (
      this.isTilePlayedAt(row, firstColumn) &&
      this.isTilePlayedAt(row, secondColumn) &&
      this.isTilePlayedAt(row, thirdColumn)
    );
  }

  private isRowFullWithSamePlayer(row: Pos) {
    return (
      this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
      this.hasSamePlayer(row, secondColumn, row, thirdColumn)
    );
  }
}
