# Hole 6 to Hole 7


## Refactorings

- Tackle domain language as result of new abstractions
  - Rename constants, variables, arguments, methods to better express domain language

Le code parle du Jeu TIC TAC TOE, on ne devrait employer des termes qui ont du sens dans ce contexte là
https://en.wikipedia.org/wiki/Tic-tac-toe

Tic-tac-toe is played on a three-by-three grid by two players, who alternately place the marks X and O in one of the nine spaces in the grid.

The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. 

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
