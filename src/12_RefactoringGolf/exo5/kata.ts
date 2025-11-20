// On garde des constantes pour éviter les "magic strings" / "magic numbers"
const EMPTY = ' ';
const PLAYER_O = 'O';

const ERROR_INVALID_FIRST_PLAYER = 'Invalid first player';
const ERROR_INVALID_NEXT_PLAYER = 'Invalid next player';
const ERROR_INVALID_POSITION = 'Invalid position';

const BOARD_SIZE = 3;

/**
 * Représente une case du plateau de Tic-Tac-Toe.
 * On en fait une vraie classe (et plus seulement une structure de données)
 * pour pouvoir respecter la loi de Demeter : on "DIT" à Tile quoi faire,
 * au lieu de lui "DEMANDER" ses données pour calculer ailleurs.
 */
class Tile {
    // Coordonnées immuables, symbole modifiable
    constructor(
        public readonly X: number,
        public readonly Y: number,
        private _symbol: string = EMPTY
    ) {}

    // Accesseur en lecture
    get Symbol(): string {
        return this._symbol;
    }

    // Accesseur en écriture (permet à Board de poser un symbole)
    set Symbol(value: string) {
        this._symbol = value;
    }

    /**
     * Indique si la case est vide.
     * → évite d'exposer le symbole et de comparer ailleurs à EMPTY.
     */
    public isEmpty(): boolean {
        return this._symbol === EMPTY;
    }

    /**
     * Indique si cette tuile a le même symbole qu'une autre.
     * (On peut décider ici si deux cases vides "comptent" ou pas ;
     * pour le Winner, on combine avec isEmpty() côté Board.)
     */
    public hasSameSymbolAs(other: Tile): boolean {
        return this._symbol === other._symbol;
    }
}

/**
 * Plateau du Tic-Tac-Toe.
 * Il "possède" les tuiles et fournit des méthodes de plus haut niveau
 * pour savoir si une ligne est pleine, homogène, etc.
 */
class Board {
    private _plays: Tile[] = [];

    constructor() {
        // Initialisation des 9 cases (3x3) toutes vides
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                this._plays.push(new Tile(row, col, EMPTY));
            }
        }
    }

    /**
     * Retourne la tuile à la position (x, y).
     */
    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X === x && t.Y === y)!;
    }

    /**
     * Place un symbole sur la tuile (x, y).
     */
    public AddTileAt(symbol: string, x: number, y: number): void {
        this.TileAt(x, y).Symbol = symbol;
    }

    /**
     * Récupère toutes les tuiles d'une ligne donnée.
     * Méthode utilitaire pour encapsuler la logique d'accès aux tuiles.
     */
    private rowTiles(row: number): Tile[] {
        return this._plays.filter((t: Tile) => t.X === row);
    }

    /**
     * Indique si une ligne est "pleine" (aucune case vide).
     * → On délègue à Tile.isEmpty() plutôt que de tester Symbol === EMPTY ailleurs.
     */
    public isRowFull(row: number): boolean {
        return this.rowTiles(row).every((tile: Tile) => !tile.isEmpty());
    }

    /**
     * Indique si une ligne est remplie avec le même symbole (X ou O).
     * → On délègue à Tile.hasSameSymbolAs() et Tile.isEmpty().
     */
    public isRowFullWithSameSymbol(row: number): boolean {
        const tiles = this.rowTiles(row);
        const [first, ...rest] = tiles;

        // Si la première case est vide, la ligne ne peut pas être gagnante
        if (!first || first.isEmpty()) {
            return false;
        }

        // Toutes les autres doivent avoir le même symbole que la première
        return rest.every((tile: Tile) => tile.hasSameSymbolAs(first));
    }

    /**
     * Renvoie le symbole gagnant d'une ligne donnée, ou EMPTY s'il n'y en a pas.
     * → Méthode de convenance pour simplifier encore Game.Winner().
     */
    public winnerOnRow(row: number): string {
        if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
            // Ici on peut renvoyer le symbole de n'importe quelle tuile de la ligne
            // @ts-ignore
            return this.rowTiles(row)[0].Symbol;
        }
        return EMPTY;
    }
}

export class Game {
    // Dernier symbole joué ("X" ou "O"), initialement personne
    private _lastSymbol: string = EMPTY;

    // Plateau de jeu
    private _board: Board = new Board();

    /**
     * Joue un coup sur la case (x, y) pour le joueur "symbol".
     * Applique les règles avant de modifier l'état.
     */
    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validatePlayer(symbol);
        this.validatePositionIsEmpty(x, y);

        this.updateLastPlayer(symbol);
        this.updateBoard(symbol, x, y);
    }

    /**
     * Règle : le premier coup ne peut pas être joué par O.
     */
    private validateFirstMove(player: string): void {
        if (this._lastSymbol === EMPTY && player === PLAYER_O) {
            throw new Error(ERROR_INVALID_FIRST_PLAYER);
        }
    }

    /**
     * Règle : deux coups consécutifs par le même joueur sont interdits.
     */
    private validatePlayer(player: string): void {
        if (player === this._lastSymbol) {
            throw new Error(ERROR_INVALID_NEXT_PLAYER);
        }
    }

    /**
     * Règle : une case déjà occupée ne peut pas être rejouée.
     * → On délègue à Board.TileAt(...).isEmpty() au lieu de "demander" Symbol.
     */
    private validatePositionIsEmpty(x: number, y: number): void {
        const tile = this._board.TileAt(x, y);
        if (!tile.isEmpty()) {
            throw new Error(ERROR_INVALID_POSITION);
        }
    }

    /** Met à jour le dernier joueur ayant joué. */
    private updateLastPlayer(player: string): void {
        this._lastSymbol = player;
    }

    /** Pose le symbole sur le plateau. */
    private updateBoard(player: string, x: number, y: number): void {
        this._board.AddTileAt(player, x, y);
    }

    /**
     * Calcule le gagnant actuel.
     * Pour l’instant on ne regarde que les lignes (comme dans les exos précédents).
     * Le refactoring ici consiste à déléguer au Board les conditions complexes :
     * - isRowFull
     * - isRowFullWithSameSymbol
     * - winnerOnRow
     */
    public Winner(): string {
        // Ligne 0
        const firstRowWinner = this._board.winnerOnRow(0);
        if (firstRowWinner !== EMPTY) {
            return firstRowWinner;
        }

        // Ligne 1
        const secondRowWinner = this._board.winnerOnRow(1);
        if (secondRowWinner !== EMPTY) {
            return secondRowWinner;
        }

        // Ligne 2
        const thirdRowWinner = this._board.winnerOnRow(2);
        if (thirdRowWinner !== EMPTY) {
            return thirdRowWinner;
        }

        // Aucun gagnant pour l’instant
        return EMPTY;
    }
}
