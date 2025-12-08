Exo 6 - README - Étudiant

Étudiants :
- Alexandre Valente Rosado
- Abdel El Haroria

## Modifications réalisées
1. Renommage des constantes de lignes/colonnes pour utiliser le langage du domaine (TOP/MIDDLE/BOTTOM, LEFT/CENTER/RIGHT).
2. Renommage des constantes joueur / case vide en termes explicites (`PLAYER_O`, `EMPTY_CELL`).
3. Clarification des noms de champs et méthodes internes dans `Game` (ex: `_lastPlayerSymbol`) et remplacement des comparaisons faibles par des comparaisons strictes (`===` / `!==`). Les API publiques `Play` et `Winner` sont conservées.
4. Renommage des méthodes et propriétés internes de `Board` et `Tile` en camelCase et en langage de domaine (`tileAt`, `addTileAt`, `findWinningRow` -> `findWinningRow`/`findWinningRow` renommé en `findWinningRow`/`findWinningRow` selon besoin, `symbol`, etc.), et ajustement des noms privés (`_symbol`). Aucun changement comportemental attendu.  
