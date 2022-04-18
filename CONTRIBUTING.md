# Contributing

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project.

## Project structure

This project is a monorepo, which uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and is divided into:

- `docs` - contains library's Docusaurus documentation
- `packages/app` - contains shared JS code for example app
- `packages/mobile` - contains mobile app example
- `packages/react-native-avoid-softinput` - contains library code

## Development workflow

### Run project's example app

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

While developing, you can run the [example app](/packages/mobile/) to test your changes. Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need to rebuild the example app.

To start the packager, run `yarn android:metro` or `yarn ios:metro`

To run the example app on Android:

```sh
yarn android:start
```

To run the example app on iOS:

```sh
yarn ios:start
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typescript
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

To edit the Swift and Objective-C files, run `yarn ios:xcode` and find the source files at `Pods > Development Pods > react-native-avoid-softinput`.

To edit the Kotlin files:

- if you have a command line launcher for Android Studio set up, you can run `yarn android:studio`
- otherwise open `packages/mobile/android` in Android Studio and find the source files at `reactnativeavoidsoftinput` under `Android`.

To run Docusaurus documentation locally, run the following: 

```sh
yarn docs:start
```

### Commit message & branch convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix(#<github-issue-id>)`: bug fixes, e.g. fix crash due to deprecated method.
- `feat(#<github-issue-id>)`: new features, e.g. add new method to the module.
- `refactor(#<github-issue-id>)`: code refactor, e.g. migrate from class components to hooks.
- `docs(#<github-issue-id>)`: changes into documentation, e.g. add usage example for the module..
- `test(#<github-issue-id>)`: adding or updating tests, e.g. add integration tests using detox.
- `chore(#<github-issue-id>)`: tooling changes, e.g. change CI config.

Example:

```
fix(#1): bug with crash...
```

Our pre-commit hooks verify that your commit message matches this format when committing.

When creating branches, follow analogic convention:

- `fix/<github-issue-id>-`: bug fixes, e.g. fix crash due to deprecated method.
- `feat/<github-issue-id>-`: new features, e.g. add new method to the module.
- `refactor/<github-issue-id>-`: code refactor, e.g. migrate from class components to hooks.
- `docs/<github-issue-id>-`: changes into documentation, e.g. add usage example for the module..
- `test/<github-issue-id>-`: adding or updating tests, e.g. add integration tests using detox.
- `chore/<github-issue-id>-`: tooling changes, e.g. change CI config.

Example:

```
git branch chore/2-configuration
```

### Linting and tests

[ESLint](https://eslint.org/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) for linting and formatting the code.

Our pre-commit hooks verify that the linter and type checks pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn typescript`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn release` release library to npm.
- `yarn bootstrap`: setup project by installing all dependencies and pods.
- `yarn pods`: setup project's pods.
- `yarn reset`: clean all project's dependencies and pods.
- `yarn reset:node_modules`: clean all project's dependencies.
- `yarn reset:pods`: clean all project's pods.
- `yarn android:metro`: start the Metro server for the example app.
- `yarn android:start`: run the example app on Android.
- `yarn android:studio`: open Android project in Android Studio.
- `yarn ios:metro`: start the Metro server for the example app.
- `yarn ios:start`: run the example app on iOS.
- `yarn ios:xcode`: open iOS project in XCode.
- `yarn docs:start`: run Docusaurus documentation locally.
- `yarn docs:build`: build Docusaurus documentation.
- `yarn docs:clear`: clear Docusaurus project.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or
  advances of any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email
  address, without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at [INSERT CONTACT METHOD]. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

### Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

#### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

#### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

#### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

#### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior, harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the community.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 2.0,
available at https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at https://www.contributor-covenant.org/translations.
