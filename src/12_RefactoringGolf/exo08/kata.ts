/* eslint-disable */

const playerO = 'O';
const noPlayer = ' ';

export enum Position {
  First = 0,
  Second = 1,
  Third = 2,
}

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: string, x: Position, y: Position): void {
    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(player);
    this.updateBoard(new Tile(x, y, player));
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: Position, y: Position) {
    if (this._board.isTilePlayedAt(x, y)) {
      throw new Error('Invalid position');
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
  private x: Position;
  private y: Position;
  private player: string = noPlayer;

  constructor(x: Position, y: Position, player: string) {
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

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x of [Position.First, Position.Second, Position.Third]) {
      for (let y of [Position.First, Position.Second, Position.Third]) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public isTilePlayedAt(x: Position, y: Position) {
    return this.findTileAt(new Tile(x, y, noPlayer))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this.findTileAt(tile)!.updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): string {
    for (let row of [Position.First, Position.Second, Position.Third]) {
      if (this.isRowFull(row) && this.isRowFullWithSamePlayer(row)) {
        return this.playerAt(row, Position.First);
      }
    }
    return noPlayer;
  }

  private findTileAt(tile: Tile) {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile));
  }

  private hasSamePlayer(x: Position, y: Position, otherX: Position, otherY: Position) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: Position, y: Position) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(x: Position, y: Position): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!;
  }

  private isRowFull(row: Position) {
    return (
        this.isTilePlayedAt(row, Position.First) &&
        this.isTilePlayedAt(row, Position.Second) &&
        this.isTilePlayedAt(row, Position.Third)
    );
  }

  private isRowFullWithSamePlayer(row: Position) {
    return (
        this.hasSamePlayer(row, Position.First, row, Position.Second) &&
        this.hasSamePlayer(row, Position.Second, row, Position.Third)
    );
  }
}
