# Hole 4 to Hole 5

Change the code in hole 4 to be identical to the code on hole 5, both implenentation and tests can change.

## Refactorings

- Tackle scope of constants and variables
  - Move constants and variables to proper scope
  - les constantes et les variable ne sont pas au bon endroit, dans le bon scope
  - Déplacez les pour qu'elles ne soient pas globales mais utilisées aux seuls endroits où on en a besoin
  - 
- Tackle duplication
  - Introduce more generic methods to replace duplicted methods
  - il y a des méthodes qui font la meme chose, trouvez les, et en les rendant à peine plus générique, réduisez le code dupliqué au strict nécessaire.

## Tips

- Use a diff tool to identify the code changes you need to perform
-  https://devconnected.com/how-to-compare-two-git-branches/
- $ git diff branch1..branch2
- Check the code coverage is enough to detect any unintended behaviour changes

### While refactoring

- Stay in the green while refactoring
  - Run the tests after each refactor
    - Check all tests still pass
    - Check code coverage has not dropped
- Commit after each refactor
- In case of persistent test fails, use `git reset` to go back to green
