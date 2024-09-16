# Refactoring Golf
![illustration code golf]( ./code_golf.png "it's you 😅")


## Instructions

npm install -g npm@latest

nvm install node

### install yarn

https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

### then, run yarn to install all dependencies

yarn needs to read the package.json file to know the dependencies and the scripts definitions

**THE FOLOWING COMMAND LINES must be typed in a terminal, at the folder PATH where there is the 'package.json' file**

```sh
yarn install --ignore-engines
```

### Execute tests

Just run the test suite

```sh
yarn test
```

#### Run the test suit with code coverage

```sh
yarn test:ci
```

# Fight the code smells
- https://www.opsera.io/blog/what-is-code-smell
- https://blog.codinghorror.com/code-smells/

![illustration code](https://osu-wams-blogs-uploads.s3.amazonaws.com/blogs.dir/6221/files/2023/01/image.png)

## on your Forked Project

- put your names in README ETUDIANTS.md; commit and push.
- Create a Pull Request on Exo01
  - Use a diff tool to see the differences in code between the starting hole and end hole
  - write your annotations, remarks... spot the problem(s)
  - make a refactoring to the code, to fix the problem
  - be sure the tests are green
  - review your changes
  - push (but don't merge) the pull request to the original repository

- Move to Exo 2 and do the same to refactor the code from Exo 2 to be like the code in Exo 3
- Apply the same pattern until you reach Exo 8
- Remember to keep the code compiling and the tests passing at all times during the refactor
- For every refactor, run the tests, and if they pass, commit
- It's okay, and actually heavily encouraged, to revert back to a previous working state at any moment


## Before you start

- Make sure the code builds, and tests are passing `yarn test`

## First run

- Refactor the code as best as you can.
  - Create your own branch based on 'Exo001', for example: 'Exo001-review'
    - Create a pull request
    - annotate your ideas, remarks on code
    - do the refactoring
    - create a Pull Request

## other runs

- Refactor the code following the treatment available for each code smell in <https://refactoring.guru/refactoring/smells>.


## Refactoring Priority Premise

### The kata uses the following order of code smells to refactor

- Refactor readability
  - Comments
  - Dead code
  - Magic strings and numbers
  - Scope (variables, blocks)
  - Clutter
  - Implicit knowledge
  - Naming
- Reduce complexity
  - Duplicated code
  - Long method
- Reorder responsibilities
  - Data class
  - Message chain
  - Feature Envy
  - Inappropriate Intimacy
  - Large class
- Refine abstractions
  - Long parameter list
  - Data clump
  - Primitive obsession
  - Middle man
- Refactor to design patterns
  - Switch statements
  - Strategy
  - State
  - Command
  - others
- Refactor to SOLID
  - Refused bequest
  - Divergent change
  - Shotgun surgery
  - Speculative generality
  - Parallel inheritance


## Additional Instructions

#### Execute mutation tests

```sh
yarn mutants
```

#### Run the tests in watch mode

```sh
yarn watch
```

## Explanations, References


https://blog.logrocket.com/using-prettier-eslint-automate-formatting-fixing-javascript/#differences-between-eslint-prettier

https://code.visualstudio.com/docs/remote/wsl-tutorial
