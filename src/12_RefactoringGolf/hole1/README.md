# Exo 8

## Refactorings

- Tackle primitive obssesion
- https://refactoring.guru/smells/primitive-obsession
- https://www.freecodecamp.org/news/what-is-primitive-obsession/
- remplacez le type 'number' par un type que vous allez créer et qui va gérer parfaitement la position des pièces sur l'échiquier,
  - sachant que cette possition est un entier compris en 1 et 3
  - vous pouvez écrire un Value Object https://talesfrom.dev/blog/modeling-value-objects-in-typescript
  - vous pouvez aussi utiliser un enum (plus simple dans ce cas là, car le nombre de possibles est 3)
 


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
