# Exo 1 to Exo 2


## Refactorings

- Tackle code comments, long method and large class
- Extract method where there is a comment 
- Extract when, logically, you can divide a method that is too long, into sub methods

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
