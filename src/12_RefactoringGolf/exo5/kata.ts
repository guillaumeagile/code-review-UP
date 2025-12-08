import { Game as CoreGame } from './Game';

export class Game {
    private core = new CoreGame();

    public Play(symbol: string, x: number, y: number): void {
        this.core.play(symbol, x, y);
    }


    public Winner(): string {
        return this.core.winner();
    }
}