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
        return this._board.findWinningRow();
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
        if (this._board.tileAt(x, y).isNotEmpty) {
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(player: string) {
        this._lastPlayerSymbol = player;
    }

    private updateBoard(player: string, x: number, y: number) {
        this._board.addTileAt(player, x, y);
    }
}

class Tile {
    private x: number = 0;
    private y: number = 0;
    private _symbol: string = EMPTY_CELL;

    constructor(x: number, y: number, symbol: string) {
        this.x = x;
        this.y = y;
        this._symbol = symbol;
    }

    get symbol() {
        return this._symbol;
    }

    get isNotEmpty() {
        return this.symbol !== EMPTY_CELL;
    }

    hasSameSymbolAs(other: Tile) {
        return this.symbol === other.symbol;
    }

    hasSameCoordinatesAs(other: Tile) {
        return this.x === other.x && this.y === other.y;
    }

    updateSymbol(newSymbol: string) {
        this._symbol = newSymbol;
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

    public tileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, EMPTY_CELL)))!;
    }

    public addTileAt(symbol: string, x: number, y: number): void {
        this._plays
            .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!
            .updateSymbol(symbol);
    }

    public findWinningRow(): string {
        if (this.isRowComplete(TOP) && this.isRowCompleteWithSameSymbol(TOP)) {
            return this.tileAt(TOP, LEFT)!.symbol;
        }

        if (this.isRowComplete(MIDDLE) && this.isRowCompleteWithSameSymbol(MIDDLE)) {
            return this.tileAt(MIDDLE, LEFT)!.symbol;
        }

        if (this.isRowComplete(BOTTOM) && this.isRowCompleteWithSameSymbol(BOTTOM)) {
            return this.tileAt(BOTTOM, LEFT)!.symbol;
        }

        return EMPTY_CELL;
    }

    private isRowComplete(row: number) {
        return (
            this.tileAt(row, LEFT)!.isNotEmpty &&
            this.tileAt(row, CENTER)!.isNotEmpty &&
            this.tileAt(row, RIGHT)!.isNotEmpty
        );
    }

    private isRowCompleteWithSameSymbol(row: number) {
        return (
            this.tileAt(row, LEFT)!.hasSameSymbolAs(this.tileAt(row, CENTER)!) &&
            this.tileAt(row, RIGHT)!.hasSameSymbolAs(this.tileAt(row, CENTER)!)
        );
    }
}

