import { EMPTY_PLAY } from './constants';

export class Tile {
    constructor(
        public readonly x: number, public readonly y: number, private _symbol: string = EMPTY_PLAY) {}

    get symbol(): string {
        return this._symbol;
    }

    public isEmpty(): boolean {
        return this._symbol === EMPTY_PLAY;
    }

    public hasSameSymbolAs(other: Tile): boolean {
        return this._symbol === other._symbol;
    }

    public setSymbol(symbol: string): void {
        this._symbol = symbol;
    }
}
