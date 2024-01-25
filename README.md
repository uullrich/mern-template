<!-- Introduction -->

# Opinionated MERN stack template

This is my opinionated MERN template with development setup. The project uses docker compose for bootstraping the Node.js backend service, React development server and MongoDB.

For the backend the project contains my prefered express app structure with demo endpoints, logging and database connection handling. File changes are detected with nodemon and if so, the node.js service is restarted in the development container.

<!-- TechStack -->

### Tech Stack

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs,ts,docker&perline=13" />
  </a>
</p>

<!-- Features -->

### Features

- :black_nib: Written in TypeScript for type-safe code
- :male_detective: Enforces high code quality standards with ESLint and Prettier
- :capital_abcd: Manages environment variables with ease using dotenv
- :floppy_disk: Utilize MongoDB to efficiently store data
- :speaking_head: Interacts with the MongoDB using the object modeling tool Mongoose
- :warning: Validate request payload with the joi library
- :memo: Detailed logging with requestId for every log entry using winston library and Node.js AsyncLocalStorage feature.

<!-- Project Structure -->

### Project Structure

#### Backend:

```
./src
├── config/         # Config files
├── connector/      # Connector files for DB etc.
├── controller/     # Route controllers
├── error/          # Error classes
├── middleware/     # Custom middlewares
├── model/          # Models for Mongoose
├── routes/         # Routes
├── service/        # Service classes
├── types/          # Types
├── util/           # Utility classes and functions
├── validation/     # Validation schemas
└── index.ts        # Express App Entrypoint
```

<!-- Env Variables -->

### Environment Variables

#### Backend

For running the backend project outside of the docker-compose development setup, you will need to add the following environment variables to your .env file.

```
# Applications running environment
NODE_ENV=

# Applications running port
PORT=

# MongoDB connection
MONGO_DB_CONNECTION=

# Applications log level
LOG_LEVEL=
```

See .env.example for further details.

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

- Node.js >= 18
- Docker
- Docker Compose

<!-- Setup -->

### Setup

For running the development environment the first time you need to execute the follwing steps:

```bash
  git clone https://github.com/uullrich/mern-template
  cd mern-template/backend
  npm install
  cd ..
  docker compose -f compose.yml -f compose.dev.yml up --build
```

For running the development environment without dependency changes you can now just execute:

```bash
  docker compose -f compose.yml -f compose.dev.yml up
```

Whenever you change dependencies in the backends package.json file you need to rebuild the container.

```bash
  docker compose -f compose.yml -f compose.{dev|test|prod}.yml up --build
```

### Cleanup

With the following command alls volumes, networks and containers are removed. Make sure to remove the docker images as well.

```bash
  docker compose -f compose.yml -f compose.{dev|test|prod}.yml down -v
```

### Tests (Integrationtests / Unit-Tests)

This template contains a bunch of example integrationtest scenarios which are created with cucumber.js. Besides of the integrationtests this template uses jest for unit tests as test runner.

The integrationtests and unit tests can be executed in their own environment using the following command:

```bash
  docker compose -f compose.yml -f compose.test.yml up --build

  #and again without dependency changes
  docker compose -f compose.yml -f compose.test.yml up
```
