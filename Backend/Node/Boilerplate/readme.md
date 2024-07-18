# Test Eric Sanchez

## Requirements

To run this project you will need a computer with Node, Typescript and Cucumber installed.

## Install

To install the project, you just have to run `yarn install` to get all the dependencies

Todo: chmod +x fleet.js

## Running the tests

After installing the dependencies you can run the tests with this command `yarn test`.

## Running CLI

yarn build
./fleet.js create-user <userId> <username>
./fleet.js create <userId>
./fleet.js register-vehicle <fleetId> <vehiclePlateNumber>
./fleet.js localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]

## Step 3

### For code quality, you can use some tools : which one and why (in a few words) ?

- ESLint: For static code analysis and maintaining consistent style.
- Prettier: For automatic code formatting.
- Jest: For unit and integration testing.
- SonarQube: For in-depth code quality analysis, detecting bugs and vulnerabilities.
- Husky: To run scripts before Git commits or pushes.

### you can consider to setup a ci/cd process : describe the necessary actions in a few words

- Set up a CI/CD pipeline (e.g., GitHub Actions)
- Define CI steps: dependency installation, linting, testing, code analysis
- Define CD steps: build, staging deployment, validation tests, production deployment
- Set up team notifications
- Manage secrets securely
- Implement a versioning system
- Create and store build artifacts
- Plan for a rollback mechanism

I have created a small example in '.github/workflows/ci-cd.yml' using Heroku without considering branching best practices.
- Trigger CI on every pull request to main branches (main, develop),
- Trigger CI/CD on pushes to the main branch (main),
- And use path filters to avoid unnecessary builds (e.g., ignore README changes).

In my case I use GitFlow or a simplified version:
- main: production code
- develop: integration branch
- feature/*: for new features
- hotfix/*: for urgent fixes

Protect main branches (main, develop) with branch rules.
Require code reviews before merges.
Use semantic commits for better traceability.