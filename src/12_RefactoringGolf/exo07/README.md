# Exo 7 to Exo 8


## Refactorings  : too many parameters and Single reason to change

- Tackle long parameter
  Example
```javascript
    this.updateBoard(player, x, y);
```
il y a trop de parametres dans cette fonction (mais oui!)
il ne pourrait y en avoir qu'un qui regroupe les 3

like this:
```javascript
       this.updateBoard(new Tile(x, y, player));
```
Ainsi, ailleurs on avait
```javascript
    this._board.AddTileAt(new Tile(x, y, player));
```
 et on pourrait avoir ceci , qui est plus simple, plus concis, plus clair à lire et à comprendre
  ```javascript
        this._board.AddTileAt(tile);
  ```

le principe est de regrouper les parametres dans un objet unique.
Cet objet doit contenir les parametres x, y et player.
Il doit avoir un nom qui permet de dire ce qu'il contient.
Cela devient un objet valeur.
Il regroupe les éléments qui ont un sens particulier et qui conceptuellement vont ensemble.

La règle de la programmation objet est d'encapsuler ensemble ce qui change ensemble.

You should group data and behavior that tend to vary for the same reason into a single module (class/object).
This reduces ripple effects when requirements change.
Why it matters:
Single reason to change: Each class should have one cause to change (Single Responsibility Principle). If x, y, and player always change together, treat them as one concept.
Encapsulation: Hide related details behind a clear interface so callers don’t need to know or pass every piece separately.
Cohesion up, coupling down: A cohesive object is easier to understand, test, and reuse; fewer parameters mean fewer dependencies.

### How to apply:
Identify the conceptual unit (e.g., a tile, money, date range, address).
Create a value object to hold the related fields and their invariants.
Move related behavior into that object (validation, formatting, basic operations).

### Benefits:
Clearer APIs and fewer parameters.
Centralized validation and rules.
Safer refactoring and easier testing.
Changes localized to one place when the concept evolves.


## Tips

- Use a diff tool to identify the code changes you need to perform
- Check the code coverage is enough to detect any unintended behaviour changes

### While refactoring

- Stay in the green while refactoring
  - Run the tests after each refactor
    - Check all tests still pass
    - Check code coverage has not dropped
- Commit after each refactor
- In case of persistent test fails, use `git reset` to go back to green
