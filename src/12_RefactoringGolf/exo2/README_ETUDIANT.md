**Étudiants ayant travaillé sur l'Exo 2 :**

Abdel El Haroria

Alexandre Valente Rosado

**Historique des commits :**

**Commit 1 :** Supprime l'annotation inutile @ts-ignore dans AddTileAt avec la const…

Nettoyage du code en supprimant une annotation superflue @ts-ignore et la constante inutile, afin de rendre le code plus lisible et propre.

**Commit 2 :** Indentation de kata.ts

Correction de l'indentation et amélioration de la lisibilité du fichier kata.ts.

**Commit 3 :** Ajout d'une méthode générique isRowFull(row) pour vérifier si une ligne est pleine

Factorisation du code répétitif (isFirstRowFull, isSecondRowFull, etc.) par l’introduction d’une méthode générique isRowFull(row).

**Commit 4 :** Ajout d'une méthode générique isRowFullWithSameSymbol(row) pour vérifier si une ligne a le même symbole

Introduction d’une méthode générique permettant de vérifier si une ligne complète contient le même symbole, supprimant ainsi la duplication de logique.

**Commit 5 :** Refactorisation de Winner() pour utiliser les nouvelles méthodes génériques

La méthode Winner() a été simplifiée pour utiliser isRowFull(row) et isRowFullWithSameSymbol(row) dans une boucle. Cela supprime la duplication et améliore la maintenabilité.

**Commit 6 :** Ajout de commentaire JSDoc utile à chaque méthode

Ajout de documentation JSDoc sur les classes et méthodes pour faciliter la compréhension et la maintenance du code.

**Résultat :** 

Suppression de code mort et duplication inutile.

Factorisation  de la logique de vérification des lignes gagnantes.

Code plus lisible, maintenable et documenté.
