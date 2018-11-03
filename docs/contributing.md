# Contributing

### Dev Tools

Make sure you've got `yarn` (1.+) and `node` (8.5+).

### Getting Started

Clone & switch to the right branch.

```
git clone git@github.com:diegoddox/speedster.git
cd speedster
```

Run the setup script to install the dependencies & run tests.

```
yarn install --ignore-engines
yarn start
```

Run the desktop app

```
yarn run start:monitor
```

### Monorepo & Lerna

This is a monorepo: multiple JS packages in 1 git repo.

We use [lerna](https://github.com/lerna/lerna) to help us.