# Exo 2 : Code Coverage

## Improve code coverage (add missing tests) 

- incomplete coverage: 
  - there is (at least) one method that is not covered by tests :
  - try to replace value returned by private method by a constant (like 0 or 42)
      - see if tests fail or not
      - if all tests are still green while code has changed, it means you have nothing to prevent a regression
      
  
  example: try to see what happen if `validateFirstMove` does not throw an error when the first player is X
   
 find out which method, when its returned value is changed, does not break any tests
      - add a test to prevent that possible regression

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
