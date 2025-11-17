/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  private readonly playerO = 'O';
  private readonly emptyPlay = ' ';

  // Enlever les constantes de ligne/colonne au niveau de la classe
  // (stockées comme propriétés de la classe alors qu’on ne les utilisait que dans la logique de Winner)

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == this.emptyPlay) {
      if (player == this.playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != this.emptyPlay) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    // On parcourt les 3 lignes du plateau : 0, 1, 2
    for (let row = 0; row < 3; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this._board.TileAt(row, 0).Symbol;
      }
    }

    return this.emptyPlay;
  }

  // On supprime des duplications qui ne sont pas nécessaires
  // On remplace les méthodes is...RowFull et is...RowFullWithSameSymbol par des méthodes génériques qui prennent l’index de la ligne.

  /**
   * Vérifie que toutes les cases d'une ligne sont jouées (non vides)
   */
  private isRowFull(row: number): boolean {
    const columns = [0, 1, 2];

    return columns.every(
        (column) => this._board.TileAt(row, column).Symbol !== this.emptyPlay,
    );
  }

  /**
   * Vérifie que toutes les cases d'une ligne ont le même symbole
   */
  private isRowFullWithSameSymbol(row: number): boolean {
    const firstSymbol = this._board.TileAt(row, 0).Symbol;
    const secondSymbol = this._board.TileAt(row, 1).Symbol;
    const thirdSymbol = this._board.TileAt(row, 2).Symbol;

    return firstSymbol === secondSymbol && thirdSymbol === secondSymbol;
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
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
