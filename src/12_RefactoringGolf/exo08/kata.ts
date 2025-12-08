/* eslint-disable */
export enum Position {
    First = 0,
    Second = 1,
    Third = 2,
}

/**
 * Convertit un nombre en Position
 * @param n
 */
export function toPosition(n: number): Position {
    if (n !== 0 && n !== 1 && n !== 2) {
        throw new Error('Invalid position, must be 0, 1 or 2');
    }
    return n as Position;
}

const playerO = 'O';
const noPlayer = ' ';

export class Game {
    private _lastPlayer = noPlayer;
    private _board: Board = new Board();

    public Play(player: string, x: number, y: number): void {
        const px = toPosition(x);
        const py = toPosition(y);
        this.validateFirstMove(player);
        this.validatePlayer(player);
        this.validatePositionIsEmpty(px, py);
        this.updateLastPlayer(player);
        this.updateBoard(new Tile(px, py, player));
    }

    /**
     * Vérifie si le premier joueur est bien le joueur X
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
     * Vérifie si le joueur est différent du dernier joueur
     * @param player
     * @private
     */
    private validatePlayer(player: string) {
        if (player == this._lastPlayer) {
            throw new Error('Invalid next player');
        }
    }

    /**
     * Vérifie si la position est vide
     * @param x
     * @param y
     * @private
     */
    private validatePositionIsEmpty(x: Position, y: Position) {
        if (this._board.isTilePlayedAt(x, y)) {
            throw new Error('Invalid position');
        }
    }

    /**
     * Met à jour le dernier joueur
     * @param player
     * @private
     */
    private updateLastPlayer(player: string) {
        this._lastPlayer = player;
    }

    /**
     * Met à jour le plateau avec la nouvelle tuile
     * @param tile
     * @private
     */
    private updateBoard(tile: Tile) {
        this._board.AddTileAt(tile);
    }

    /**
     * Vérifie s'il y a un gagnant
     * @constructor
     */
    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }
}

class Tile {
    private x: Position;
    private y: Position;
    private player: string = noPlayer;

    constructor(x: number | Position, y: number | Position, player: string) {
        this.x = typeof x === 'number' ? toPosition(x) : x;
        this.y = typeof y === 'number' ? toPosition(y) : y;
        this.player = player;
    }

    get Player() {
        return this.player;
    }

    get isNotEmpty() {
        return this.Player !== noPlayer;
    }

    /**
     * Vérifie si deux tuiles appartiennent au même joueur
     * @param other
     */
    hasSamePlayerAs(other: Tile) {
        return this.Player === other.Player;
    }

    /**
     * Vérifie si deux tuiles ont les mêmes coordonnées
     * @param other
     */
    hasSameCoordinatesAs(other: Tile) {
        return this.x === other.x && this.y === other.y;
    }

    /**
     * Met à jour le joueur de la tuile
     * @param newPlayer
     */
    updatePlayer(newPlayer: string) {
        this.player = newPlayer;
    }
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let x = Position.First; x <= Position.Third; x++) {
            for (let y = Position.First; y <= Position.Third; y++) {
                this._plays.push(new Tile(x, y, noPlayer));
            }
        }
    }

    /**
     * Vérifie si une tuile est déjà jouée aux coordonnées données
     * @param x
     * @param y
     */
    public isTilePlayedAt(x: number | Position, y: number | Position) {
        return this.findTileAt(new Tile(x, y, noPlayer))!.isNotEmpty;
    }

    /**
     * Ajoute une tuile au plateau
     * @param tile
     * @constructor
     */
    public AddTileAt(tile: Tile): void {
        this.findTileAt(tile)!.updatePlayer(tile.Player);
    }

    /**
     * Vérifie si une ligne est remplie par le même joueur et retourne ce joueur
     */
    public findRowFullWithSamePlayer(): string {
        if (this.isRowFull(Position.First) && this.isRowFullWithSamePlayer(Position.First)) {
            return this.playerAt(Position.First, Position.First);
        }

        if (this.isRowFull(Position.Second) && this.isRowFullWithSamePlayer(Position.Second)) {
            return this.playerAt(Position.Second, Position.First);
        }

        if (this.isRowFull(Position.Third) && this.isRowFullWithSamePlayer(Position.Third)) {
            return this.playerAt(Position.Third, Position.First);
        }

        return noPlayer;
    }

    /**
     * Récupère la tuile aux coordonnées données
     * @param tile
     * @private
     */
    private findTileAt(tile: Tile) {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile));
    }

    /**
     * Vérifie si les tuiles aux positions données appartiennent au même joueur
     * @param x
     * @param y
     * @param otherX
     * @param otherY
     * @private
     */
    private hasSamePlayer(x: Position, y: Position, otherX: Position, otherY: Position) {
        return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
    }

    /**
     * Récupère le joueur à la position donnée
     * @param x
     * @param y
     * @private
     */
    private playerAt(x: Position, y: Position) {
        return this.TileAt(x, y)!.Player;
    }

    /*
     * Récupère la tuile à la position donnée
     */
    private TileAt(x: Position, y: Position): Tile {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!;
    }

    /*
     * Vérifie si une ligne est remplie
     */
    private isRowFull(row: Position) {
        return (
            this.isTilePlayedAt(row, Position.First) &&
            this.isTilePlayedAt(row, Position.Second) &&
            this.isTilePlayedAt(row, Position.Third)
        );
    }

    /*
     * Vérifie si une ligne est remplie par le même joueur
     */
    private isRowFullWithSamePlayer(row: Position) {
        return (
            this.hasSamePlayer(row, Position.First, row, Position.Second) &&
            this.hasSamePlayer(row, Position.Second, row, Position.Third)
        );
    }
}
