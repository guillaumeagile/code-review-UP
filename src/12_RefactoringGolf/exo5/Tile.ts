import { EMPTY_PLAY } from './constants';

export class Tile {
    constructor(
        public readonly x: number, public readonly y: number, private _symbol: string = EMPTY_PLAY) {}

    /**
     * Retourne le symbole de la tuile
     */
    get symbol(): string {
        return this._symbol;
    }

    /**
     * Vérifie si la tuile est vide
     */
    public isEmpty(): boolean {
        return this._symbol === EMPTY_PLAY;
    }

    /**
     * Vérifie si la tuile a le même symbole qu'une autre tuile
     * @param other
     */
    public hasSameSymbolAs(other: Tile): boolean {
        return this._symbol === other._symbol;
    }

    /**
     * Définit le symbole de la tuile
     * @param symbol
     */
    public setSymbol(symbol: string): void {
        this._symbol = symbol;
    }
}
