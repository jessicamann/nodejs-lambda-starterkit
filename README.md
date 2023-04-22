[![CircleCI](https://dl.circleci.com/status-badge/img/gh/jessicamann/nodejs-lambda-starterkit/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/jessicamann/nodejs-lambda-starterkit/tree/main)

# nodejs-lambda-starterkit

A starter kit for serverside node application using fastify and lambda.

Included in the starter kit:

- typescript
- eslint
- prettier
- jest
- precommit with husky

App components in the starter kit:

- logger
- web server (`fastify`) with `@fastify/autoload` for routes organization

Docs components in the starter kit:

- @fastify/swagger to generate OpenAPI spec based on defined route schema

# Running the example

Prepare your environment:

```bash
cp .env.example .env
npm install --frozen-lockfile
npm build
```

```bash
# local development running as node
npm start
```

OR

```bash
# local development running as a lambda
npm run start:asLambda
```

Then see a request go through:

```bash
curl localhost:3000/ping
```

# Generate API spec under /docs

Run the following command to generate the spec as json:

```bash
npm run generate:openapi
```

# git-mob for adding your co-authors to the commit

This repository comes with a sample `.git-coauthors` file checked in. If you pair (or mob) frequently, git-mob makes it easy to append co-authors to your commit messages.

`git-mob` is a cli tool, so you'll need to install it globally:

```bash
npm i -g git-mob
cp .git-coauthors ~/.git-coauthors
```

Simply add your teammembers into the `.git-coauthors` file and use as such

```bash
git mob dg
git commit
```

Voila! Your coauthor has been added.

# Todos

- [ ] https://www.fastify.io/docs/latest/Guides/Ecosystem/
- [ ] structured example (internal structure)
- [ ] structured example (api test)
- [ ] structured example (contract tests)
- [ ] openapi
- [ ] authetication
- [ ] improve logging
- [ ] metrics / telemetry
- [ ] graceful shutdown (do we need this for lambda?)
- [ ] db connection
- [ ] publish as a package | create a GH template
