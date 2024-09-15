# Exo 5 to Exo 6


## Refactorings
- PROBLEME: la loi de Demeter n'est pas respectée ("Tell, Don't Ask" ou "Holywood Pronciple")
  - https://savoiragile.com/2012/05/04/connaissez-vous-la-loi-de-demeter/   
  - https://tech-fr.netlify.app/articles/fr512716/index.html
  - https://www.arolla.fr/blog/2017/02/principes-solid-vie-de-jours/#Loi_de_Demeter
  - 
- REVUE DE CODE: repérez les endroits où, pour obtenir une condition dans un IF, on fait appel (ASK) à des propriétés 
qui ne sont pas dans l'objet courant
  Example:
```javascript
    if (
         this._board.TileAt(row, firstColumn)!.Symbol ==
        this._board.TileAt(row, secondColumn)!.Symbol 
    )
```

- REFACTORING:
  - simplifiez les précidicats (les instruction logiques booléennes) en appelant une méthode au niveau de l'objet qui 'possède' les propriétés nécessaires pour évaluer la condition

```javascript
 if (
         this._board.TileAt(row, firstColumn)!.hasSameSymbolAs(this._board.TileAt(row, secondColumn))
    )
    `....`

  hasSameSymbolAs(other: Tile) {
    return this.Symbol === other.Symbol;
  }
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
