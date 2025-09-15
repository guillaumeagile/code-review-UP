const EMPTY_SYMBOL = ' ';
const PLAYER_O = 'O';

const BOARD_SIZE = 3;
const ROW_FIRST = 0;
const ROW_SECOND = 1;
const ROW_THIRD = 2;

const ERR_INVALID_FIRST_PLAYER = 'Invalid first player';
const ERR_INVALID_NEXT_PLAYER = 'Invalid next player';
const ERR_INVALID_POSITION = 'Invalid position';

export class Game {
    private _lastSymbol = EMPTY_SYMBOL;
    private _board: Board = new Board();
    
    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validatePlayer(symbol);
        this.validatePositionIsEmpty(x, y);
        
        this.updateLastPlayer(symbol);
        this.updateBoard(symbol, x, y);
    }
    
    private validateFirstMove(player: string) {
        if (this._lastSymbol == EMPTY_SYMBOL) {
            if (player == PLAYER_O) {
                throw new Error(ERR_INVALID_FIRST_PLAYER);
            }
        }
    }
    
    private validatePlayer(player: string) {
        if (player == this._lastSymbol) {
            throw new Error(ERR_INVALID_NEXT_PLAYER);
        }
    }
    
    private validatePositionIsEmpty(x: number, y: number) {
        if (this._board.TileAt(x, y).Symbol != EMPTY_SYMBOL) {
            throw new Error(ERR_INVALID_POSITION);
        }
    }
    
    private updateLastPlayer(player: string) {
        this._lastSymbol = player;
    }
    
    private updateBoard(player: string, x: number, y: number) {
        this._board.AddTileAt(player, x, y);
    }
    
    public Winner(): string {
        if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
            return this._board.TileAt(ROW_FIRST, 0)!.Symbol;
        }
        
        if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
            return this._board.TileAt(ROW_SECOND, 0)!.Symbol;
        }
        
        if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
            return this._board.TileAt(ROW_THIRD, 0)!.Symbol;
        }
        
        return EMPTY_SYMBOL;
    }
    
    private isFirstRowFull() {
        return (
            this._board.TileAt(ROW_FIRST, 0)!.Symbol != EMPTY_SYMBOL &&
            this._board.TileAt(ROW_FIRST, 1)!.Symbol != EMPTY_SYMBOL &&
            this._board.TileAt(ROW_FIRST, 2)!.Symbol != EMPTY_SYMBOL
        );
    }
    
    private isFirstRowFullWithSameSymbol() {
        return (
            this._board.TileAt(ROW_FIRST, 0)!.Symbol == this._board.TileAt(ROW_FIRST, 1)!.Symbol &&
            this._board.TileAt(ROW_FIRST, 2)!.Symbol == this._board.TileAt(ROW_FIRST, 1)!.Symbol
        );
    }
    
    private isSecondRowFull() {
        return (
            this._board.TileAt(ROW_SECOND, 0)!.Symbol != EMPTY_SYMBOL &&
            this._board.TileAt(ROW_SECOND, 1)!.Symbol != EMPTY_SYMBOL &&
            this._board.TileAt(ROW_SECOND, 2)!.Symbol != EMPTY_SYMBOL
        );
    }
    
    private isSecondRowFullWithSameSymbol() {
        return (
            this._board.TileAt(ROW_SECOND, 0)!.Symbol == this._board.TileAt(ROW_SECOND, 1)!.Symbol &&
            this._board.TileAt(ROW_SECOND, 2)!.Symbol == this._board.TileAt(ROW_SECOND, 1)!.Symbol
        );
    }
    
    private isThirdRowFull() {
        return (
            this._board.TileAt(ROW_THIRD, 0)!.Symbol != EMPTY_SYMBOL &&
            this._board.TileAt(ROW_THIRD, 1)!.Symbol != EMPTY_SYMBOL &&
            this._board.TileAt(ROW_THIRD, 2)!.Symbol != EMPTY_SYMBOL
        );
    }
    
    private isThirdRowFullWithSameSymbol() {
        return (
            this._board.TileAt(ROW_THIRD, 0)!.Symbol == this._board.TileAt(ROW_THIRD, 1)!.Symbol &&
            this._board.TileAt(ROW_THIRD, 2)!.Symbol == this._board.TileAt(ROW_THIRD, 1)!.Symbol
        );
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
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                const tile: Tile = { X: i, Y: j, Symbol: EMPTY_SYMBOL };
                this._plays.push(tile);
            }
        }
    }
    
    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }
    
    public AddTileAt(symbol: string, x: number, y: number): void {
        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}