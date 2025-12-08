/* eslint-disable */
export enum Position {
    First = 0,
    Second = 1,
    Third = 2,
}

export function toPosition(n: number): Position {
    if (n !== 0 && n !== 1 && n !== 2) {
        throw new Error('Invalid position, must be 0, 1 or 2');
    }
    return n as Position;
}

const playerO = 'O';
const noPlayer = ' ';

export class Game {
    private _lastPlayer = noPlayer;
    private _board: Board = new Board();

    public Play(player: string, x: number, y: number): void {
        this.validateFirstMove(player);
        this.validatePlayer(player);
        this.validatePositionIsEmpty(x, y);

        this.updateLastPlayer(player);
        this.updateBoard(new Tile(x, y, player));
    }

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
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

    private validatePositionIsEmpty(x: number, y: number) {
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
}

class Tile {
    private x: Position;
    private y: Position;
    private player: string = noPlayer;

    constructor(x: number | Position, y: number | Position, player: string) {
        this.x = typeof x === 'number' ? toPosition(x) : x;
        this.y = typeof y === 'number' ? toPosition(y) : y;
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
        return this.x === other.x && this.y === other.y;
    }

    updatePlayer(newPlayer: string) {
        this.player = newPlayer;
    }
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let x = Position.First; x <= Position.Third; x++) {
            for (let y = Position.First; y <= Position.Third; y++) {
                this._plays.push(new Tile(x, y, noPlayer));
            }
        }
    }

    public isTilePlayedAt(x: number | Position, y: number | Position) {
        return this.findTileAt(new Tile(x, y, noPlayer))!.isNotEmpty;
    }

    public AddTileAt(tile: Tile): void {
        this.findTileAt(tile)!.updatePlayer(tile.Player);
    }

    public findRowFullWithSamePlayer(): string {
        if (this.isRowFull(Position.First) && this.isRowFullWithSamePlayer(Position.First)) {
            return this.playerAt(Position.First, Position.First);
        }

        if (this.isRowFull(Position.Second) && this.isRowFullWithSamePlayer(Position.Second)) {
            return this.playerAt(Position.Second, Position.First);
        }

        if (this.isRowFull(Position.Third) && this.isRowFullWithSamePlayer(Position.Third)) {
            return this.playerAt(Position.Third, Position.First);
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
