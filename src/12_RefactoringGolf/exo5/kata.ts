const EMPTY = ' ';
const PLAYER_O = 'O';

const ERROR_INVALID_FIRST_PLAYER = 'Invalid first player';
const ERROR_INVALID_NEXT_PLAYER = 'Invalid next player';
const ERROR_INVALID_POSITION = 'Invalid position';

const BOARD_SIZE = 3;

/**
 * EXO 5 : On transforme Tile en vraie classe avec du comportement
 * → pour arrêter de faire 50 comparaisons de Symbol partout dans Game/Board.
 * → Objectif : appliquer la loi de Demeter ("Tell, don't ask").
 */
class Tile {
    constructor(
        public readonly X: number,
        public readonly Y: number,
        private _symbol: string = EMPTY
    ) {}

    get Symbol(): string {
        return this._symbol;
    }

    set Symbol(value: string) {
        this._symbol = value;
    }

    /** EXO 5 : méthode utilitaire pour remplacer (tile.Symbol === EMPTY) */
    public isEmpty(): boolean {
        return this._symbol === EMPTY;
    }

    /** EXO 5 : méthode utilitaire pour remplacer (tile1.Symbol === tile2.Symbol) */
    public hasSameSymbolAs(other: Tile): boolean {
        return this._symbol === other._symbol;
    }
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                this._plays.push(new Tile(row, col, EMPTY));
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t) => t.X === x && t.Y === y)!;
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
        this.TileAt(x, y).Symbol = symbol;
    }

    /** EXO 5 : méthode utilitaire pour récupérer toute une ligne */
    private rowTiles(row: number): Tile[] {
        return this._plays.filter((t) => t.X === row);
    }

    /** EXO 5 : remplace l’ancien code qui vérifiait 3 fois (Symbol !== EMPTY) */
    public isRowFull(row: number): boolean {
        return this.rowTiles(row).every((tile) => !tile.isEmpty());
    }

    /** EXO 5 : remplace les comparaisons Symbol == Symbol dans Game */
    public isRowFullWithSameSymbol(row: number): boolean {
        const tiles = this.rowTiles(row);
        const first = tiles[0];

        if (first.isEmpty()) return false;

        return tiles.every((tile) => tile.hasSameSymbolAs(first));
    }

    /** EXO 5 : évite à Game d'accéder directement aux Symbols */
    public winnerOnRow(row: number): string {
        if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
            return this.rowTiles(row)[0].Symbol;
        }
        return EMPTY;
    }
}

export class Game {
    private _lastSymbol: string = EMPTY;
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validatePlayer(symbol);
        this.validatePositionIsEmpty(x, y);

        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    private validateFirstMove(player: string): void {
        if (this._lastSymbol === EMPTY && player === PLAYER_O) {
            throw new Error(ERROR_INVALID_FIRST_PLAYER);
        }
    }

    private validatePlayer(player: string): void {
        if (player === this._lastSymbol) {
            throw new Error(ERROR_INVALID_NEXT_PLAYER);
        }
    }

    /**
     * EXO 5 : on remplace
     *   this._board.TileAt(x,y).Symbol !== EMPTY
     * par
     *   tile.isEmpty()
     * → meilleure encapsulation
     */
    private validatePositionIsEmpty(x: number, y: number): void {
        if (!this._board.TileAt(x, y).isEmpty()) {
            throw new Error(ERROR_INVALID_POSITION);
        }
    }

    /**
     * EXO 5 : Game ne compare plus les Symbols lui-même.
     * Il délègue tout au Board.
     */
    public Winner(): string {
        const w0 = this._board.winnerOnRow(0);
        if (w0 !== EMPTY) return w0;

        const w1 = this._board.winnerOnRow(1);
        if (w1 !== EMPTY) return w1;

        const w2 = this._board.winnerOnRow(2);
        if (w2 !== EMPTY) return w2;

        return EMPTY;
    }
}
