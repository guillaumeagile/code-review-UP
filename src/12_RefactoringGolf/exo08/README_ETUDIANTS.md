Exo 8 - README - Étudiant

Étudiants :

Alexandre Valente Rosado
Abdel El Haroria

Modifications réalisées

1) Introduit l'enum `Position` et la fonction `toPosition` création d'un enum `Position` (First=0, Second=1, Third=2) et d'une fonction `toPosition(n: number): Position` qui valide et convertit un nombre en `Position` (lance une erreur si hors bornes).
2) Tile : stockage des coordonnées en `Position` la classe `Tile` stocke maintenant `x` et `y` comme `Position`. Le constructeur accepte un `number` ou `Position` et convertit avec `toPosition` si nécessaire. Ajout de petites méthodes d'accès et de comparaison (`hasSamePlayerAs`, `hasSameCoordinatesAs`, `isNotEmpty`, `updatePlayer`).
3) Board : utilise `Position` et clarifie les responsabilités le plateau (`Board`) initialise la grille en utilisant `Position` et expose des méthodes publiques compatibles (elles acceptent encore des `number | Position`). Méthodes ajoutées/clarifiées : `isTilePlayedAt`, `AddTileAt`, `findRowFullWithSamePlayer`, `findTileAt`, `hasSamePlayer`, `playerAt`, `TileAt`, `isRowFull`, `isRowFullWithSamePlayer`.
4) Game : conversion d'entrée et validations séparées  la classe `Game` convertit immédiatement les coordonnées reçues en `Position` (via `toPosition`) pour l'utilisation interne. Les validations sont séparées en petites méthodes : `validateFirstMove`, `validatePlayer`, `validatePositionIsEmpty`. L'ajout de coups se fait via un `Tile` et `Board.AddTileAt`.
