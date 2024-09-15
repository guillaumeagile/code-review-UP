# Warmup : make it green


## Refactorings

- all tests are red, why?  maybe just a little mistake (learn to understand the errors displayed in the tests)
- one variable name is not satisfying, fix it


## Tips

- Use a diff tool to identify the code changes you need to perform
- Check the code coverage is enough to detect any unintended behaviour changes

### While refactoring

- Stay in the green while refactoring; no failing tests
  - Run the tests after each refactor
    - Check all tests still pass
    - Check code coverage has not dropped
- Commit after each refactor
- In case of persistent compilation errors or test fails, use `git reset` to go back to green
