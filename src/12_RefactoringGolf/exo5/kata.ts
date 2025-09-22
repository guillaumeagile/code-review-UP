/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

// ------------------ TILE ------------------
class Tile {
    constructor(public X: number, public Y: number, private _symbol: string = emptyPlay) {}

    public isEmpty(): boolean {
        return this._symbol === emptyPlay;
    }

    public place(symbol: string): void {
        if (!this.isEmpty()) {
            throw new Error('Invalid position');
        }
        this._symbol = symbol;
    }

    public hasSameSymbolAs(other: Tile): boolean {
        return this._symbol === other._symbol && !this.isEmpty();
    }

    public symbol(): string {
        return this._symbol;
    }
}

// ------------------ BOARD ------------------
class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = firstRow; i <= thirdRow; i++) {
            for (let j = firstColumn; j <= thirdColumn; j++) {
                this._plays.push(new Tile(i, j));
            }
        }
    }

    public tileAt(x: number, y: number): Tile {
        return this._plays.find(t => t.X === x && t.Y === y)!;
    }

    public addTileAt(symbol: string, x: number, y: number): void {
        this.tileAt(x, y).place(symbol);
    }

    public findRowFullWithSamePlayer(): string {
        for (const row of [firstRow, secondRow, thirdRow]) {
            if (this.isRowFull(row) && this.isRowUniform(row)) {
                return this.tileAt(row, firstColumn).symbol();
            }
        }
        return emptyPlay;
    }

    private isRowFull(row: number): boolean {
        return !this.tileAt(row, firstColumn).isEmpty() &&
            !this.tileAt(row, secondColumn).isEmpty() &&
            !this.tileAt(row, thirdColumn).isEmpty();
    }

    private isRowUniform(row: number): boolean {
        return this.tileAt(row, firstColumn).hasSameSymbolAs(this.tileAt(row, secondColumn)) &&
            this.tileAt(row, secondColumn).hasSameSymbolAs(this.tileAt(row, thirdColumn));
    }
}

// ------------------ GAME ------------------
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
        if (this._lastSymbol === emptyPlay && player === playerO) {
            throw new Error('Invalid first player');
        }
    }

    private validatePlayer(player: string) {
        if (player === this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }

    private validatePositionIsEmpty(x: number, y: number) {
        if (!this._board.tileAt(x, y).isEmpty()) {
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(player: string) {
        this._lastSymbol = player;
    }

    private updateBoard(player: string, x: number, y: number) {
        this._board.addTileAt(player, x, y);
    }

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }
}
