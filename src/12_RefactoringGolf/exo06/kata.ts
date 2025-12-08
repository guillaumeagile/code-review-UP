/* eslint-disable */

const TOP = 0;
const MIDDLE = 1;
const BOTTOM = 2;
const LEFT = 0;
const CENTER = 1;
const RIGHT = 2;

const PLAYER_O = 'O';
const EMPTY_CELL = ' ';

export class Game {
    private _lastPlayerSymbol = EMPTY_CELL;
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstPlayerMove(symbol);
        this.validateNextPlayer(symbol);
        this.validatePositionIsEmpty(x, y);

        this.updateLastPlayer(symbol);
        this.updateBoard(symbol, x, y);
    }

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }

    private validateFirstPlayerMove(player: string) {
        if (this._lastPlayerSymbol === EMPTY_CELL) {
            if (player === PLAYER_O) {
                throw new Error('Invalid first player');
            }
        }
    }

    private validateNextPlayer(player: string) {
        if (player === this._lastPlayerSymbol) {
            throw new Error('Invalid next player');
        }
    }

    private validatePositionIsEmpty(x: number, y: number) {
        if (this._board.TileAt(x, y).isNotEmpty) {
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(player: string) {
        this._lastPlayerSymbol = player;
    }

    private updateBoard(player: string, x: number, y: number) {
        this._board.AddTileAt(player, x, y);
    }
}

class Tile {
    private x: number = 0;
    private y: number = 0;
    private symbol: string = EMPTY_CELL;

    constructor(x: number, y: number, symbol: string) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
    }

    get Symbol() {
        return this.symbol;
    }

    get isNotEmpty() {
        return this.Symbol !== EMPTY_CELL;
    }

    hasSameSymbolAs(other: Tile) {
        return this.Symbol === other.Symbol;
    }

    hasSameCoordinatesAs(other: Tile) {
        return this.x == other.x && this.y == other.y;
    }

    updateSymbol(newSymbol: string) {
        this.symbol = newSymbol;
    }
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let x = TOP; x <= BOTTOM; x++) {
            for (let y = LEFT; y <= RIGHT; y++) {
                this._plays.push(new Tile(x, y, EMPTY_CELL));
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, EMPTY_CELL)))!;
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
        this._plays
            .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!
            .updateSymbol(symbol);
    }

    public findRowFullWithSamePlayer(): string {
        if (this.isRowFull(TOP) && this.isRowFullWithSameSymbol(TOP)) {
            return this.TileAt(TOP, LEFT)!.Symbol;
        }

        if (this.isRowFull(MIDDLE) && this.isRowFullWithSameSymbol(MIDDLE)) {
            return this.TileAt(MIDDLE, LEFT)!.Symbol;
        }

        if (this.isRowFull(BOTTOM) && this.isRowFullWithSameSymbol(BOTTOM)) {
            return this.TileAt(BOTTOM, LEFT)!.Symbol;
        }

        return EMPTY_CELL;
    }

    private isRowFull(row: number) {
        return (
            this.TileAt(row, LEFT)!.isNotEmpty &&
            this.TileAt(row, CENTER)!.isNotEmpty &&
            this.TileAt(row, RIGHT)!.isNotEmpty
        );
    }

    private isRowFullWithSameSymbol(row: number) {
        return (
            this.TileAt(row, LEFT)!.hasSameSymbolAs(this.TileAt(row, CENTER)!) &&
            this.TileAt(row, RIGHT)!.hasSameSymbolAs(this.TileAt(row, CENTER)!)
        );
    }
}
