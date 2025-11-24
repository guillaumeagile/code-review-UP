import { Tile } from './Tile';

export class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = { X: i, Y: j, Symbol: ' ' };
                this._plays.push(tile);
            }
        }
    }

    /**
     * Gets the tile at the specified coordinates
     * @param x
     * @param y
     * @constructor
     */
    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }

    /**
     * Adds a tile at the specified coordinates
     * @param symbol
     * @param x
     * @param y
     * @constructor
     */
    public AddTileAt(symbol: string, x: number, y: number): void {
        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}
