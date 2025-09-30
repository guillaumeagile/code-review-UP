/* eslint-disable */

export class Game {
    private _lastSymbol = ' ';
    private _board: Board = new Board();

    /**
     * Play a move
     * @param symbol
     * @param x
     * @param y
     * @constructor
     */
    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validatePlayer(symbol);
        this.validatePositionIsEmpty(x, y);
        this.updateLastPlayer(symbol);
        this.updateBoard(symbol, x, y);
    }

    /**
     * Validate that the first move is made by player 'X'
     * @param player
     * @private
     */
    private validateFirstMove(player: string) {
        if (this._lastSymbol == ' ') {
            if (player == 'O') {
                throw new Error('Invalid first player');
            }
        }
    }

    /**
     * Validate that the next player is not the same as the last one
     * @param player
     * @private
     */
    private validatePlayer(player: string) {
        if (player == this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }

    /**
     * Validate that the position is empty
     * @param x
     * @param y
     * @private
     */
    private validatePositionIsEmpty(x: number, y: number) {
        if (this._board.TileAt(x, y).Symbol != ' ') {
            throw new Error('Invalid position');
        }
    }

    /**
     * Update the last player
     * @param player
     * @private
     */
    private updateLastPlayer(player: string) {
        this._lastSymbol = player;
    }

    /**
     * Update the board with the player's move
     * @param player
     * @param x
     * @param y
     * @private
     */
    private updateBoard(player: string, x: number, y: number) {
        this._board.AddTileAt(player, x, y);
    }

    /**
     * Check if a row is full
     * @param row
     * @private
     */
    private isRowFull(row: number): boolean {
        return (
            this._board.TileAt(row, 0)!.Symbol != ' ' &&
            this._board.TileAt(row, 1)!.Symbol != ' ' &&
            this._board.TileAt(row, 2)!.Symbol != ' '
        );
    }

    /**
     * Check if a row is full with the same symbol
     * @param row
     * @private
     */
    private isRowFullWithSameSymbol(row: number): boolean {
        return (
            this._board.TileAt(row, 0)!.Symbol == this._board.TileAt(row, 1)!.Symbol &&
            this._board.TileAt(row, 2)!.Symbol == this._board.TileAt(row, 1)!.Symbol
        );
    }


    /**
     * Get the winner of the game
     * @constructor
     */
    public Winner(): string {
        for (let row = 0; row < 3; row++) {
            if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
                return this._board.TileAt(row, 0)!.Symbol;
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

/**
 * Class representing the Tic-Tac-Toe board
 */
class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = {X: i, Y: j, Symbol: ' '};
                this._plays.push(tile);
            }
        }
    }

    /**
     * Get the tile at the given position
     * @param x
     * @param y
     * @constructor
     */
    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }

    /**
     * Add a tile at the given position
     * @param symbol
     * @param x
     * @param y
     * @constructor
     */
    public AddTileAt(symbol: string, x: number, y: number): void {
        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }


}
