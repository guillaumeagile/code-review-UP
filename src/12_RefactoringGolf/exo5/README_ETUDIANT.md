Exo 5 - README - Étudiant

Étudiants :
- Alexandre Valente Rosado
- Abdel El Haroria 

Modifications réalisées
1. Extraction de l'entité `Tile` en classe dédiée avec encapsulation du symbole et méthodes utilitaires (`isEmpty`, `hasSameSymbolAs`).
2. Implémentation de la classe `Board` : gestion des tuiles, validation de position (`isWithinBounds`), et méthode `isEmpty`.
3. Refactor de `kata.ts` : séparation des responsabilités et utilisation de `Board` et `Tile`.
4. Ajout d'une classe `Game` qui utilise `Board` pour les validations et la logique de partie.
5. Factorisation des vérifications de lignes gagnantes : méthodes génériques et itération sur les lignes pour éviter la duplication.
6. Centralisation des constantes dans `constants.ts`.
7. Ajout de commentaires JSDoc pour `Game` et `Board`.
8. Nettoyage de l'indentation .

