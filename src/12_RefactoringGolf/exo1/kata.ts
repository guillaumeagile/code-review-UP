/* eslint-disable */

export class Game {
    private _lastSymbol = ' ';
    private _toto: Board = new Board();


    /**
     * Play a move
     * @param symbol 'X' or 'O'
     * @param x X coordinate (0, 1, or 2)
     * @param y Y coordinate (0, 1, or 2)
     */
    public Play(symbol: string, x: number, y: number): void {
        if (this.isFirstMoveInvalid(symbol)) throw new Error('Invalid first player');
        if (this.isRepeatedPlayer(symbol)) throw new Error('Invalid next player');
        if (this.isPositionTaken(x, y)) throw new Error('Invalid position');

        this._lastSymbol = symbol;
        this._toto.AddTileAt(symbol, x, y);
    }


    /**
     * Check if there is a winner
     * Returns 'X' if player X wins, 'O' if player O wins, or ' ' if there is no winner yet
     * @constructor
     */
    public Winner(): string {
        for (let row = 0; row < 3; row++) {
            if (this.isWinningRow(row)) return this._toto.TileAt(row, 0).Symbol;
        }
        return ' ';
    }


    // ------------------- Private method for Play() -------------------
    private isFirstMoveInvalid(symbol: string): boolean {
        return this._lastSymbol === ' ' && symbol === 'O';
    }

    private isRepeatedPlayer(symbol: string): boolean {
        return symbol === this._lastSymbol;
    }

    private isPositionTaken(x: number, y: number): boolean {
        return this._toto.TileAt(x, y).Symbol !== ' ';
    }

    // ------------------- Private method for Winner() -------------------
    private isWinningRow(row: number): boolean {
        const a = this._toto.TileAt(row, 0).Symbol;
        const b = this._toto.TileAt(row, 1).Symbol;
        const c = this._toto.TileAt(row, 2).Symbol;
        return a !== ' ' && a === b && b === c;
    }
}

interface Tile {
    X: number;
    Y: number;
    Symbol: string;
}

class Board {
    private _plays: Tile[] = [];

    /**
     * Initialize the board with empty tiles
     */
    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = {X: i, Y: j, Symbol: ' '};
                this._plays.push(tile);
            }
        }
    }

    /**
     * Get the tile at the given coordinates
     * @param x
     * @param y
     * @constructor
     */
    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }

    /**
     * Add a tile at the given coordinates with the given symbol
     * @param symbol
     * @param x
     * @param y
     * @constructor
     */
    public AddTileAt(symbol: string, x: number, y: number): void {
        //@ts-ignore
        const tile: Tile = {X: x, Y: y, Symbol: symbol};

        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }


}
