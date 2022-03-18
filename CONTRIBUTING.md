# How To Contribute

This repo is divided into multiple packages using pnpm workspaces:
- `addon` is the actual ember-animated-tools addon
- `test-app` is its test suite

## Installation

* `git clone https://github.com/ember-animation/ember-animated-tools.git`
* `cd ember-animated-tools`
* `pnpm install`

## Linting

Inside any of the packages you can run:

* `pnpm lint`
* `pnpm lint:fix`

## Running tests

* `cd addon && pnpm run start` – Builds the addon in "watch mode" so changes picked up by test app.
* `cd test-app && ember test` – Runs the test suite on the current Ember version
* `cd test-app && ember test --server` – Runs the test suite in "watch mode"
* `cd test-app && ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `cd addon && pnpm run start` – Builds the addon in "watch mode" so changes picked up by the docs app.
* `cd test-app && ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
