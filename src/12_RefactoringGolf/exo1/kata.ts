/* eslint-disable */

export class Game {
    private _lastSymbol = ' ';
    private _toto: Board = new Board();

    /**
     * Play a move
     * @param symbol 'X' or 'O'
     * @param x X coordinate (0, 1, or 2)
     * @param y Y coordinate (0, 1, or 2)
     * @constructor
     */
    public Play(symbol: string, x: number, y: number): void {
        if (this._lastSymbol == ' ') {
            if (symbol == 'O') {
                throw new Error('Invalid first player');
            }
        } else if (symbol == this._lastSymbol) {
            throw new Error('Invalid next player');
        } else if (this._toto.TileAt(x, y).Symbol != ' ') {
            throw new Error('Invalid position');
        }

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
            if (
                this._toto.TileAt(row, 0).Symbol !== ' ' &&
                this._toto.TileAt(row, 0).Symbol === this._toto.TileAt(row, 1).Symbol &&
                this._toto.TileAt(row, 1).Symbol === this._toto.TileAt(row, 2).Symbol
            ) {
                return this._toto.TileAt(row, 0).Symbol;
            }
        }
        return ' ';
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
