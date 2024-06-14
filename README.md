# Node Docker Host

A `node.js` service that picks other `node.js` repository from Github and runs it as Docker container on your your machine.
Included in the pack:
- Database: PostgreSQL
- ORM: sequelize
- Migration: sequelize-cli
- Validation: joi
- Asynchronous pub/sub: Redis
- HTTP Request: axios

## Prerequisite

- Docker : make sure Docker is installed on your machine. The service will check it when starting up.
- PostgreSQL : version 14 or above is preferred. You can install it yourself or spun up a docker container via `npm run pg-docker` command.
- Redis : you can install it yourself or spun up a docker container via `npm run redis-docker` command.

## Installation

- Clone this repository: `git clone git@github.com:yogski/node-docker-host.git`
- Go to repository: `cd node-docker-host`
- Install Dependencies: `npm install`
- Setup env: Copy `.env.example`, then rename it as `.env`, then fill the values accordingly
  - DATABASE_URL: URL connection to database. No need to change if you use `npm run pg-docker`.
  - PORT: port for this service
  - DOCKER_PORT_LOWER_BOUND: lower bound for available ports of hosted containers
  - DOCKER_PORT_UPPER_BOUND: upper bound for available ports of hosted continers
  - REDIS_URL: URL connection to redis. No need to change if you use `npm run redis-docker`
  - REDIS_CHANNEL: name of redis pub/sub channel
  - NODE_VERSION: recommended to use node version on your machine
- Migrate DB: Run `npx sequelize-cli db:migrate`
- Run `npm start`

## Features & Limitations

### What type of Node.js repository is supported?

The initial version supports limited types of node.js repository. It supports node.js with npm, no build option, and custom entrypoint. In the future, support for yarn and pnpm will be added. Added support for build process will also be added.

### Does the service takes long to boot up?

It takes few minutes to boot up and prepare the container. The process is asynchronous thanks to Redis pub/sub. The feature to monitor, restart, and control is underway.

## Working Example

I found simple Node.js REST API service that can be used.

```
POST /api/services Request body

{
    "project_name": "node.js-simple-api",
    "github_url": "https://github.com/mwangiKibui/node.js-simple-api",
    "entrypoint": "src/index.js"
}
```

## Contributions

This repository definitely can be more robust. This feature will be added over time. I really appreciate any bug report, pull request, or suggestion.
You could:
- submit bug report or feature request
- submit pull request
- star this repository
- push this repository on social media.
