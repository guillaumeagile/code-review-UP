import { Board } from './Board';
import { PLAYER_O, EMPTY_PLAY } from './constants';

export class Game {
    private _lastSymbol = EMPTY_PLAY;
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validatePlayer(symbol);
        this.validatePositionIsEmpty(x, y);

        this.updateLastPlayer(symbol);
        this.updateBoard(symbol, x, y);
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

    private validatePositionIsEmpty(x: number, y: number) {
        if (!this._board.tileAt(x, y).isEmpty()) {
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(player: string) {
        this._lastSymbol = player;
    }

    private updateBoard(player: string, x: number, y: number) {
        this._board.addTileAt(player, x, y);
    }
}