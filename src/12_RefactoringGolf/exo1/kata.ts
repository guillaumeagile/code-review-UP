/* eslint-disable */

// read the code
export class Game {
    private _lastSymbol = ' ';
    private _toto: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validateTurn(symbol);
        this.validatePosition(x, y);

        this._lastSymbol = symbol;
        this._toto.AddTileAt(symbol, x, y);
    }

    private validateFirstMove(symbol: string): void {
        if (this._lastSymbol === ' ' && symbol === 'O') {
            throw new Error('Invalid first player');
        }
    }

    private validateTurn(symbol: string): void {
        if (this._lastSymbol !== ' ' && symbol === this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }

    private validatePosition(x: number, y: number): void {
        if (this._toto.TileAt(x, y).Symbol !== ' ') {
            throw new Error('Invalid position');
        }
    }


    public Winner(): string {
        for (let row = 0; row < 3; row++) {
            const winner = this.checkRow(row);
            if (winner !== ' ') return winner;
        }
        return ' ';
    }

    private checkRow(row: number): string {
        const first = this._toto.TileAt(row, 0).Symbol;
        if (first !== ' ' &&
            first === this._toto.TileAt(row, 1).Symbol &&
            first === this._toto.TileAt(row, 2).Symbol) {
            return first;
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

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = {X: i, Y: j, Symbol: ' '};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
//@ts-ignore
        const tile: Tile = {X: x, Y: y, Symbol: symbol};

        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}

// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review