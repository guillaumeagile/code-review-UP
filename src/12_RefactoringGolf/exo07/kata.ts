const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const noPlayer = " ";

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(tile: Tile): void {
    this.validateFirstMove(tile.Player);
    this.validatePlayer(tile.Player);
    this.validatePositionIsEmpty(tile.Coordinates);

    this.updateLastPlayer(tile.Player);
    this.updateBoard(tile);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(coordinates: Coordinates) {
    if (this._board.isTilePlayedAt(coordinates)) {
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

export class Coordinates {
  private x: number = 0;
  private y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }
}

export class Tile {
  private coordinates: Coordinates;
  private player: string = noPlayer;

  constructor(coordinates: Coordinates, player: string) {
    this.coordinates = coordinates;
    this.player = player;
  }

  get Player() {
    return this.player;
  }

  get Coordinates() {
    return this.coordinates;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.coordinates.X == other.coordinates.X && this.coordinates.Y == other.coordinates.Y;
  }

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(new Coordinates(x, y), noPlayer));
      }
    }
  }

  public isTilePlayedAt(coordinates: Coordinates) {
    return this._plays.find((t: Tile) =>
      t.hasSameCoordinatesAs(new Tile(new Coordinates(coordinates.X, coordinates.Y), noPlayer)),
    )!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this._plays
      .find((t: Tile) => t.hasSameCoordinatesAs(tile))!
      .updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSamePlayer(firstRow)) {
      return this.playerAt(new Coordinates(firstRow, firstColumn));
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSamePlayer(secondRow)) {
      return this.playerAt(new Coordinates(secondRow, firstColumn));
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSamePlayer(thirdRow)) {
      return this.playerAt(new Coordinates(thirdRow, firstColumn));
    }

    return noPlayer;
  }

  private hasSamePlayer(coordinates: Coordinates, otherCoordinates: Coordinates) {
    return this.TileAt(coordinates)!.hasSamePlayerAs(this.TileAt(otherCoordinates)!);
  }

  private playerAt(coordinates: Coordinates) {
    return this.TileAt(coordinates)!.Player;
  }

  private TileAt(coordinates: Coordinates): Tile {
    return this._plays.find((t: Tile) =>
      t.hasSameCoordinatesAs(new Tile(coordinates, noPlayer)),
    )!;
  }

  private isRowFull(row: number) {
    return (
      this.isTilePlayedAt(new Coordinates(row, firstColumn)) &&
      this.isTilePlayedAt(new Coordinates(row, secondColumn)) &&
      this.isTilePlayedAt(new Coordinates(row, thirdColumn))
    );
  }

  private isRowFullWithSamePlayer(row: number) {
    return (
      this.hasSamePlayer(new Coordinates(row, firstColumn), new Coordinates(row, secondColumn)) &&
      this.hasSamePlayer(new Coordinates(row, secondColumn), new Coordinates(row, thirdColumn))
    );
  }
}
