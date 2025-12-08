import { Board } from './Board';
import { PLAYER_O, EMPTY_PLAY } from './constants';

export class Game {
    private _lastSymbol = EMPTY_PLAY;
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
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

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }

    private validateFirstMove(player: string) {
        if (this._lastSymbol === EMPTY_PLAY && player === PLAYER_O) {
            throw new Error('Invalid first player');
        }
    }

    private validatePlayer(player: string) {
        if (player === this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }
}
