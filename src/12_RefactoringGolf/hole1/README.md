# Hole 9 to Hole 10

Change the code in hole 9 to be identical to the code on hole 10, both implenentation and tests can change.

## Refactorings

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
