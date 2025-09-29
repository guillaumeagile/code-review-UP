/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastMark = emptyPlay;
  private _grid: Grid = new Grid();

  public Play(mark: string, x: number, y: number): void {
    this.validateFirstMove(mark);
    this.validatePlayer(mark);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(mark);
    this.updateGrid(mark, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastMark == emptyPlay) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastMark) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._grid.SpaceAt(x, y).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastMark = player;
  }

  private updateGrid(player: string, x: number, y: number) {
    this._grid.AddSpaceAt(player, x, y);
  }

  public Winner(): string {
    return this._grid.findRowFullWithSamePlayer();
  }
}

class Space {
  private x: number = 0;
  private y: number = 0;
  private mark: string = ' ';

  constructor(x: number, y: number, mark: string) {
    this.x = x;
    this.y = y;
    this.mark = mark;
  }

  get Mark() {
    return this.mark;
  }

  get isNotEmpty() {
    return this.Mark !== emptyPlay;
  }

  hasSameMarkAs(other: Space) {
    return this.Mark === other.Mark;
  }

  hasSameCoordinatesAs(other: Space) {
    return this.x == other.x && this.y == other.y;
  }

  updateMark(newMark: string) {
    this.mark = newMark;
  }
}

class Grid {
  private _plays: Space[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Space(x, y, emptyPlay));
      }
    }
  }

  public SpaceAt(x: number, y: number): Space {
    return this._plays.find((t: Space) => t.hasSameCoordinatesAs(new Space(x, y, emptyPlay)))!;
  }

  public AddSpaceAt(mark: string, x: number, y: number): void {
    this._plays
      .find((t: Space) => t.hasSameCoordinatesAs(new Space(x, y, mark)))!
      .updateMark(mark);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameMark(firstRow)) {
      return this.SpaceAt(firstRow, firstColumn)!.Mark;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameMark(secondRow)) {
      return this.SpaceAt(secondRow, firstColumn)!.Mark;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameMark(thirdRow)) {
      return this.SpaceAt(thirdRow, firstColumn)!.Mark;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this.SpaceAt(row, firstColumn)!.isNotEmpty &&
      this.SpaceAt(row, secondColumn)!.isNotEmpty &&
      this.SpaceAt(row, thirdColumn)!.isNotEmpty
    );
  }

  private isRowFullWithSameMark(row: number) {
    return (
      this.SpaceAt(row, firstColumn)!.hasSameMarkAs(this.SpaceAt(row, secondColumn)!) &&
      this.SpaceAt(row, thirdColumn)!.hasSameMarkAs(this.SpaceAt(row, secondColumn)!)
    );
  }
}
