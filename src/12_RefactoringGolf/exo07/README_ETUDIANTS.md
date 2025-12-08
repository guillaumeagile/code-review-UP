Exo 6 - README - Étudiant

Étudiants :
- Alexandre Valente Rosado
- Abdel El Haroria

## Modifications réalisées
1) Refactor — regrouper les paramètres du coup en un objet `Tile``Game.updateBoard` prend désormais un objet `Tile` au lieu de trois paramètres séparés.

2) Refactor — créer le `Tile` une seule fois dans `Play` et ajouter des getters dans `Game.Play` on crée `const tile = new Tile(x, y, player)` et on réutilise cet objet pour toutes les validations et l'ajout au plateau.

3) Refactor — centraliser la mise à jour du dernier joueur via `Tile``updateLastPlayer` reçoit désormais un `Tile` et met à jour le champ `_lastPlayer` en lisant `tile.Player`.
