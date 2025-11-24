import { Tile } from './tile';
import { EMPTY_SYMBOL, BOARD_SIZE } from './constants';

export class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                this._plays.push({ X: i, Y: j, Symbol: EMPTY_SYMBOL });
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t) => t.X == x && t.Y == y)!;
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
        this._plays.find((t) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}
