/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const noPlayer = ' ';

export class Game {
    private _lastPlayer = noPlayer;
    private _board: Board = new Board();

    public Play(player: string, x: number, y: number): void {
        this.validateFirstMove(player);
        this.validatePlayer(player);

        const tile = new Tile(x, y, player);

        this.validatePositionIsEmpty(tile);

        this.updateLastPlayer(tile);
        this.updateBoard(tile);
    }

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }

  /**
   * Verifie si le premier joueur est bien le joueur X
   * @param player
   * @private
   */
    private validateFirstMove(player: string) {
        if (this._lastPlayer == noPlayer) {
            if (player == playerO) {
                throw new Error('Invalid first player');
            }
        }
    }

  /**
   * Verifie si le joueur est different du dernier joueur ayant joue
   * @param player
   * @private
   */
    private validatePlayer(player: string) {
        if (player == this._lastPlayer) {
            throw new Error('Invalid next player');
        }
    }

  /**
   * Verifie si la position est deja occupee
   * @param tile
   * @private
   */
    private validatePositionIsEmpty(tile: Tile) {
        if (this._board.isTilePlayedAt(tile.X, tile.Y)) {
            throw new Error('Invalid position');
        }
    }

  /**
   * Met a jour le dernier joueur ayant joue
   * @param tile
   * @private
   */
    private updateLastPlayer(tile: Tile) {
        this._lastPlayer = tile.Player;
    }

  /**
   * Met a jour le plateau avec la nouvelle tuile
   * @param tile
   * @private
   */
    private updateBoard(tile: Tile) {
        this._board.AddTileAt(tile);
    }
}

class Tile {
    private x: number = 0;
    private y: number = 0;
    private player: string = noPlayer;

    constructor(x: number, y: number, player: string) {
        this.x = x;
        this.y = y;
        this.player = player;
    }

    get Player() {
        return this.player;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    get isNotEmpty() {
        return this.Player !== noPlayer;
    }

  /**
   * Verifie si deux tuiles ont le meme joueur
   * @param other
   */
  hasSamePlayerAs(other: Tile) {
        return this.Player === other.Player;
    }

  /**
   * Verifie si deux tuiles ont les memes coordonnees
   * @param other
   */
  hasSameCoordinatesAs(other: Tile) {
        return this.x == other.x && this.y == other.y;
    }

  /**
    * Met a jour le joueur de la tuile
   * @param newPlayer
   */
  updatePlayer(newPlayer: string) {
        this.player = newPlayer;
    }
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let x = firstRow; x <= thirdRow; x++) {
            for (let y = firstColumn; y <= thirdColumn; y++) {
                this._plays.push(new Tile(x, y, noPlayer));
            }
        }
    }

  /**
   * Verifie si une tuile est deja jouee
   * @param x
   * @param y
   */
    public isTilePlayedAt(x: number, y: number) {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!.isNotEmpty;
    }

  /**
   * Ajoute une tuile au plateau
   * @param tile
   * @constructor
   */
    public AddTileAt(tile: Tile): void {
        this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile))!.updatePlayer(tile.Player);
    }

  /**
   * Recherche une ligne complete avec le meme joueur
   */
  public findRowFullWithSamePlayer(): string {
        if (this.isRowFull(firstRow) && this.isRowFullWithSamePlayer(firstRow)) {
            return this.playerAt(firstRow, firstColumn);
        }

        if (this.isRowFull(secondRow) && this.isRowFullWithSamePlayer(secondRow)) {
            return this.playerAt(secondRow, firstColumn);
        }

        if (this.isRowFull(thirdRow) && this.isRowFullWithSamePlayer(thirdRow)) {
            return this.playerAt(thirdRow, firstColumn);
        }

        return noPlayer;
    }

  /**
   * Verifie si deux tuiles ont le meme joueur
   * @param x
   * @param y
   * @param otherX
   * @param otherY
   * @private
   */
    private hasSamePlayer(x: number, y: number, otherX: number, otherY: number) {
        return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
    }

  /**
   * Recupere le joueur a la position x,y
   * @param x
   * @param y
   * @private
   */
    private playerAt(x: number, y: number) {
        return this.TileAt(x, y)!.Player;
    }

  /**
   * Recupere la tuile a la position x,y
   * @param x
   * @param y
   * @constructor
   * @private
   */
    private TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!;
    }

  /**
   * Verifie si une ligne est complete
   * @param row
   * @private
   */
    private isRowFull(row: number) {
        return (
            this.isTilePlayedAt(row, firstColumn) &&
            this.isTilePlayedAt(row, secondColumn) &&
            this.isTilePlayedAt(row, thirdColumn)
        );
    }

  /**
   * Verifie si une ligne est complete avec le meme joueur
   * @param row
   * @private
   */
    private isRowFullWithSamePlayer(row: number) {
        return (
            this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
            this.hasSamePlayer(row, secondColumn, row, thirdColumn)
        );
    }
}
