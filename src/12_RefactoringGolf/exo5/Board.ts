import { Tile } from './Tile';
import {FIRST_ROW, SECOND_ROW, THIRD_ROW, FIRST_COLUMN, SECOND_COLUMN, THIRD_COLUMN,EMPTY_PLAY,} from './constants';

export class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = FIRST_ROW; i <= THIRD_ROW; i++) {
            for (let j = FIRST_COLUMN; j <= THIRD_COLUMN; j++) {
                this._plays.push(new Tile(i, j, EMPTY_PLAY));
            }
        }
    }

    public isWithinBounds(x: number, y: number): boolean {
        return x >= FIRST_ROW && x <= THIRD_ROW && y >= FIRST_COLUMN && y <= THIRD_COLUMN;
    }

    public tileAt(x: number, y: number): Tile {
        if (!this.isWithinBounds(x, y)) {
            throw new Error('Position hors limites');
        }
        return this._plays.find((t) => t.x === x && t.y === y)!;
    }

    public isEmpty(x: number, y: number): boolean {
        return this.tileAt(x, y).isEmpty();
    }

    public addTileAt(symbol: string, x: number, y: number): void {
        this.tileAt(x, y).setSymbol(symbol);
    }

    public findRowFullWithSamePlayer(): string {
        const rows = [FIRST_ROW, SECOND_ROW, THIRD_ROW];
        for (const row of rows) {
            if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
                return this.tileAt(row, FIRST_COLUMN).symbol;
            }
        }
        return EMPTY_PLAY;
    }

    private isRowFull(row: number) {
        return (
            !this.tileAt(row, FIRST_COLUMN).isEmpty() &&
            !this.tileAt(row, SECOND_COLUMN).isEmpty() &&
            !this.tileAt(row, THIRD_COLUMN).isEmpty()
        );
    }

    private isRowFullWithSameSymbol(row: number) {
        return (
            this.tileAt(row, FIRST_COLUMN).hasSameSymbolAs(this.tileAt(row, SECOND_COLUMN)) &&
            this.tileAt(row, THIRD_COLUMN).hasSameSymbolAs(this.tileAt(row, SECOND_COLUMN))
        );
    }
}
