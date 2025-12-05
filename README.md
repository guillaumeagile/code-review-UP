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

## on branch 'ExoNN' , tests must be green

```
Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total

```

# Fight the code smells
- https://www.opsera.io/blog/what-is-code-smell
- https://blog.codinghorror.com/code-smells/

![illustration code](https://osu-wams-blogs-uploads.s3.amazonaws.com/blogs.dir/6221/files/2023/01/image.png)

# Exercise for Students

- Fork the project on your GitHub account OR join the Github classroom
  - if you fork: UNcheck the option `Copy the main branch only`
- Clone the project on your local machine
  - if you joined the Github classroom, just switch to the branch 'Exo01'
- open the file `src/12_RefactoringGolf/exo1/kata.ts`
-  fix indentation first -> to produce a change, on which you can comment/start a review
- use Prettier to fix the indentation (see below)
- commit and push that change
- goto the github page of the project, and create a Pull Request on the branch 'Exo01'
- click on 'Contribute' button, then click on 'Open a pull request'
-  make your comments, using :
  1. your brain -> spot only the problem described on this exercise
  2. your AI ->  you must only answer the question of this exercise (EXO 01)
- Write a review !!!!   IMPORTANT ! a score (grade) will be given for this step
- Refactor the code to fix the problem(s), ONLY WHERE YOU PLACE A COMMENT/REVIEW !!!!!
  - ***code modified by AI that does not respond to the review will be rejected***
- Ensure the tests are still green
- Commit and push your changes

## Prettier

To install Prettier, you can use npm or yarn. Here are the commands for both:

Using npm:

```sh
npm install --save-dev prettier
```
Using yarn:

```sh
yarn add --dev prettier
```

After installation, you can format your code using Prettier by running:

```sh
npx prettier --write .
```

This will format all files in your project. You can also create a .prettierrc file to customize Prettier's configuration.


## on your Forked Project

- put your names in README ETUDIANTS.md; commit and push.
- copy each branch for each exercise (new branch from), prefix with your name or group name , like 'ICE-GRP1/Exo01'  from /Exo01
- Create a Pull Request on the new branch
  - reformat the source code using Prettier (to create a first change on the file)
  - write your annotations, remarks... spot the problem(s) that are described in the exercise
  - make a refactoring to the code, to fix the problem
  - be sure the tests are green
  - push (but don't merge) the pull request to the original repository

- Move to Exo 2 and do a new refactoring
- Apply the same pattern until you reach Exo 8
- Remember to keep the code compiling and the tests passing at all times during the refactor
- For every refactor, run the tests, and if they pass, commit
- It's okay, and actually heavily encouraged, to revert back to a previous working state at any moment


## Before you start

- Make sure the code builds, and tests are passing `yarn test`



## Guiding Principles

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

Cours SOLID de Isabelle Blasquez (IUT Limoges)

todo::::

https://github.com/iblasquez/enseignement-but2-developpement/blob/master/cours/SOLID.pdf

https://blog.logrocket.com/using-prettier-eslint-automate-formatting-fixing-javascript/#differences-between-eslint-prettier
