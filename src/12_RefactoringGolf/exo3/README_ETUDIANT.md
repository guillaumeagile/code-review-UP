# Exo 3 — README \- Étudiant

Étudiants ayant travaillé sur l'Exo 3
- Abdel El Haroria
- Alexandre Valente Rosado

## Objectif
Refactorer le code pour améliorer la lisibilité, réduire la duplication et préparer une meilleure séparation des classes tout en restant compatible avec les tests

## Modifications réalisées
- Extraction de la constante `EMPTY_SYMBOL` 
- Correction du check du premier joueur : utilisation de `PLAYER_O` (`'O'`) au lieu du caractère zéro (`'0'`).
- Factorisation des vérifications des lignes gagnantes : création de méthodes génériques `isRowFull(row)` et `isRowFullWithSameSymbol(row)` et itération dans `Winner()`.
- Séparation des entités en fichiers distincts : `constants.ts`, `tile.ts`, `board.ts`,
- Ajout de commentaires JSDoc pour `Game` et `Board`.
