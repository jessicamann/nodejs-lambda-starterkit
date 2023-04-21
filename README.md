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

# Todos

- [ ] https://www.fastify.io/docs/latest/Guides/Ecosystem/
- [ ] pipeline (github actions? circleci?)
- [ ] improve logging
- [ ] metrics / telemetry
- [ ] structured example (internal structure)
- [ ] structured example (api test)
- [ ] structured example (contract tests)
- [ ] openapi
- [ ] authetication
- [ ] graceful shutdown (do we need this for lambda?)
- [ ] db connection
- [ ] publish as a package | create a GH template
