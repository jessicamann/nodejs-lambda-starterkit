[![CircleCI](https://dl.circleci.com/status-badge/img/gh/jessicamann/nodejs-lambda-starterkit/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/jessicamann/nodejs-lambda-starterkit/tree/main)
[![CodeFactor](https://www.codefactor.io/repository/github/jessicamann/nodejs-lambda-starterkit/badge)](https://www.codefactor.io/repository/github/jessicamann/nodejs-lambda-starterkit)

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
./scripts/devsetup
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
mkdir -p docs
npm run build
npm run generate:openapi
pbcopy < docs/spec.json
```

Head on over to the [swagger editor](https://editor-next.swagger.io/) and paste it in!

# git-mob for adding your pair(s) to commits

If you pair (or mob) frequently, [git-mob](https://www.npmjs.com/package/git-mob#add-co-author-from-github) makes it easy to append co-authors to your commit messages.

This repository comes with a sample [`.git-coauthors`](.git-coauthors) file checked in, and the [`devsetup.sh`](scripts/devsetup.sh) script copies over the file to where it needs to be.

If you get a new teammate, don't forget to check them in and remind the team to update their co-authors file after they pull.

```sh
cp .git-coauthors ~/.git-coauthors
```

# Todos

- [ ] https://www.fastify.io/docs/latest/Guides/Ecosystem/
- [ ] authetication
- [ ] structured example (api test)
- [ ] structured example (contract tests)
- [ ] improve logging
- [ ] metrics / telemetry
- [ ] graceful shutdown
- [ ] db connection
- [ ] publish as a package | create a GH template
- [ ] [devbox](https://www.jetpack.io/devbox/docs/quickstart)

### lambda

- [ ] dockerize?
