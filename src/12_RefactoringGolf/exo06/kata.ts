/* eslint-disable */

const TOP = 0;
const MIDDLE = 1;
const BOTTOM = 2;
const LEFT = 0;
const CENTER = 1;
const RIGHT = 2;

const PLAYER_O = 'O';
const EMPTY_CELL = ' ';

export class Game {
    private _lastPlayerSymbol = EMPTY_CELL;
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstPlayerMove(symbol);
        this.validateNextPlayer(symbol);
        this.validatePositionIsEmpty(x, y);
        this.updateLastPlayer(symbol);
        this.updateBoard(symbol, x, y);
    }

    public Winner(): string {
        return this._board.findWinningRow();
    }

    /**
     * Valide que le premier joueur est bien 'X'.
     * @param player
     * @private
     */
    private validateFirstPlayerMove(player: string) {
        if (this._lastPlayerSymbol === EMPTY_CELL) {
            if (player === PLAYER_O) {
                throw new Error('Invalid first player');
            }
        }
    }

    /**
     * Valide que le joueur est différent du dernier joueur.
     * @param player
     * @private
     */
    private validateNextPlayer(player: string) {
        if (player === this._lastPlayerSymbol) {
            throw new Error('Invalid next player');
        }
    }

    /**
     * Valide que la position est vide.
     * @param x
     * @param y
     * @private
     */
    private validatePositionIsEmpty(x: number, y: number) {
        if (this._board.tileAt(x, y).isNotEmpty) {
            throw new Error('Invalid position');
        }
    }

    /**
     * Met à jour le dernier joueur.
     * @param player
     * @private
     */
    private updateLastPlayer(player: string) {
        this._lastPlayerSymbol = player;
    }

    /**
     * Met à jour le plateau de jeu.
     * @param player
     * @param x
     * @param y
     * @private
     */
    private updateBoard(player: string, x: number, y: number) {
        this._board.addTileAt(player, x, y);
    }
}

class Tile {
    private x: number = 0;
    private y: number = 0;
    private _symbol: string = EMPTY_CELL;

    constructor(x: number, y: number, symbol: string) {
        this.x = x;
        this.y = y;
        this._symbol = symbol;
    }

    get symbol() {
        return this._symbol;
    }

    get isNotEmpty() {
        return this.symbol !== EMPTY_CELL;
    }

    /**
     * Vérifie si deux tuiles ont le même symbole.
     * @param other
     */
    hasSameSymbolAs(other: Tile) {
        return this.symbol === other.symbol;
    }

    /**
     * Vérifie si deux tuiles ont les mêmes coordonnées.
     * @param other
     */
    hasSameCoordinatesAs(other: Tile) {
        return this.x === other.x && this.y === other.y;
    }

    /**
     * Met à jour le symbole de la tuile.
     * @param newSymbol
     */
    updateSymbol(newSymbol: string) {
        this._symbol = newSymbol;
    }
}


class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let x = TOP; x <= BOTTOM; x++) {
            for (let y = LEFT; y <= RIGHT; y++) {
                this._plays.push(new Tile(x, y, EMPTY_CELL));
            }
        }
    }

    /**
     * Retourne la tuile à une position donnée.
     * @param x
     * @param y
     */
    public tileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, EMPTY_CELL)))!;
    }

    /**
     * Ajoute un symbole à une position donnée.
     * @param symbol
     * @param x
     * @param y
     */
    public addTileAt(symbol: string, x: number, y: number): void {
        this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!.updateSymbol(symbol);
    }

    /**
     * Recherche une ligne gagnante.
     */
    public findWinningRow(): string {
        if (this.isRowComplete(TOP) && this.isRowCompleteWithSameSymbol(TOP)) {
            return this.tileAt(TOP, LEFT)!.symbol;
        }

        if (this.isRowComplete(MIDDLE) && this.isRowCompleteWithSameSymbol(MIDDLE)) {
            return this.tileAt(MIDDLE, LEFT)!.symbol;
        }

        if (this.isRowComplete(BOTTOM) && this.isRowCompleteWithSameSymbol(BOTTOM)) {
            return this.tileAt(BOTTOM, LEFT)!.symbol;
        }

        return EMPTY_CELL;
    }

    /**
     * Vérifie si une ligne est complétée.
     * @param row
     * @private
     */
    private isRowComplete(row: number) {
        return (
            this.tileAt(row, LEFT)!.isNotEmpty &&
            this.tileAt(row, CENTER)!.isNotEmpty &&
            this.tileAt(row, RIGHT)!.isNotEmpty
        );
    }

    /**
     * Vérifie si une ligne est complétée avec le même symbole.
     * @param row
     * @private
     */
    private isRowCompleteWithSameSymbol(row: number) {
        return (
            this.tileAt(row, LEFT)!.hasSameSymbolAs(this.tileAt(row, CENTER)!) &&
            this.tileAt(row, RIGHT)!.hasSameSymbolAs(this.tileAt(row, CENTER)!)
        );
    }
}

