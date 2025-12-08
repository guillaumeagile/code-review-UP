import { Board } from './Board';
import { PLAYER_O, EMPTY_PLAY } from './constants';

export class Game {
    private _lastSymbol = EMPTY_PLAY;
    private _board: Board = new Board();

    /**
     * Joue un coup pour le joueur avec le symbole donné aux coordonnées (x, y)
     * @param symbol
     * @param x
     * @param y
     */
    public play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validatePlayer(symbol);

        if (!this._board.isWithinBounds(x, y)) {
            throw new Error('Invalid position');
        }
        if (!this._board.isEmpty(x, y)) {
            throw new Error('Invalid position');
        }

        this._board.addTileAt(symbol, x, y);
        this._lastSymbol = symbol;
    }

    /**
     * Retourne le symbole du joueur gagnant, ou EMPTY_PLAY s'il n'y a pas de gagnant
     */
    public winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }

    /**
     * Valide que le premier joueur est bien PLAYER_X
     * @param player
     * @private
     */
    private validateFirstMove(player: string) {
        if (this._lastSymbol === EMPTY_PLAY && player === PLAYER_O) {
            throw new Error('Invalid first player');
        }
    }

    /**
     * Valide que le joueur actuel n'est pas le même que le dernier joueur
     * @param player
     * @private
     */
    private validatePlayer(player: string) {
        if (player === this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }
}
