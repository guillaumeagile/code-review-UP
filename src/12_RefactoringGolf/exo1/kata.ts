/* eslint-disable */

// read the code
export class Game {
    private _lastSymbol = ' ';
    private _toto: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.checkFirstMove(symbol);
        this.checkNextPlayer(symbol);
        this.checkPosition(x, y);
        this.updateGameState(symbol, x, y);
    }

    private checkFirstMove(symbol: string): void {
        if (this._lastSymbol == ' ') {
            if (symbol == 'O') {
                throw new Error('Invalid first player');
            }
        }
    }

    private checkNextPlayer(symbol: string): void {
        if (this._lastSymbol != ' ' && symbol == this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }

    private checkPosition(x: number, y: number): void {
        if (this._lastSymbol != ' ' && this._toto.TileAt(x, y).Symbol != ' ') {
            throw new Error('Invalid position');
        }
    }

    private updateGameState(symbol: string, x: number, y: number): void {
        this._lastSymbol = symbol;
        this._toto.AddTileAt(symbol, x, y);
    }

    public Winner(): string {
        const winnerRow0 = this.checkRowWinner(0);
        if (winnerRow0 !== ' ') return winnerRow0;
        const winnerRow1 = this.checkRowWinner(1);
        if (winnerRow1 !== ' ') return winnerRow1;
        const winnerRow2 = this.checkRowWinner(2);
        if (winnerRow2 !== ' ') return winnerRow2;
        return ' ';
    }

    private checkRowWinner(row: number): string {
        if (
            this._toto.TileAt(row, 0)!.Symbol != ' ' &&
            this._toto.TileAt(row, 1)!.Symbol != ' ' &&
            this._toto.TileAt(row, 2)!.Symbol != ' '
        ) {
            if (
                this._toto.TileAt(row, 0)!.Symbol == this._toto.TileAt(row, 1)!.Symbol &&
                this._toto.TileAt(row, 2)!.Symbol == this._toto.TileAt(row, 1)!.Symbol
            ) {
                return this._toto.TileAt(row, 0)!.Symbol;
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

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = { X: i, Y: j, Symbol: ' ' };
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
        //@ts-ignore
        const tile: Tile = { X: x, Y: y, Symbol: symbol };
        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}
// create a PR,
// fix indentation first
// commit and push
// make your comments,
// then refactor
// submit your PR for review