# GraphQL Yoga Server

This project is a GraphQL server built with GraphQL Yoga, designed to provide a robust and scalable API for client applications.

## Getting Started

### Prerequisites

- Node.js and npm must be installed on your system.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Server

To launch the server, use the following command:

```bash
npm run start
```

This will execute the server using `ts-node` to run the TypeScript code directly. The server will be available at the default port configured in the application.

For development with automatic restarts on file changes, you can use:

```bash
npm run dev
```

This uses `nodemon` to watch for changes in the `src` directory and restart the server automatically.

## Libraries and Dependencies

This project utilizes several libraries to facilitate GraphQL server development, HTTP handling, and WebSocket support for subscriptions:

- **GraphQL Yoga (`graphql-yoga`)**: A fully-featured GraphQL server library with focus on easy setup, performance, and great developer experience.
- **GraphQL (`graphql`)**: The core GraphQL library for JavaScript, providing the foundation for schema and query execution.
- **GraphQL-WS (`graphql-ws`)**: Implements the GraphQL over WebSocket Protocol for real-time subscriptions.
- **GraphQL-HTTP (`graphql-http`)**: A library for serving GraphQL over HTTP.
- **Fastify (`fastify`)**: A fast and low overhead web framework for Node.js, used for handling HTTP requests.
- **Fastify CORS (`@fastify/cors`)**: Enables Cross-Origin Resource Sharing for the Fastify server.
- **Fastify WebSocket (`@fastify/websocket`)**: Adds WebSocket support to Fastify for real-time communication.
- **Express (`express`)**: A minimal and flexible Node.js web application framework (used alongside Fastify in some configurations).
- **CORS (`cors`)**: Middleware for enabling CORS in Express applications.
- **UUID (`uuid`)**: For generating unique identifiers.
- **Undici (`undici`)**: An HTTP/1.1 client, used for making HTTP requests from the server.
- **WS (`ws`)**: A WebSocket library for Node.js.

### Development Dependencies

- **TypeScript (`typescript`)**: For static typing in JavaScript, enhancing code maintainability and reducing errors.
- **TS-Node (`ts-node`)**: Allows running TypeScript directly with Node.js, used for executing the server during development and start.
- **Nodemon (`nodemon`)**: Monitors for file changes and automatically restarts the server during development.
- Various type definitions for TypeScript support (`@types/*`).

## Project Structure

- `src/index.ts`: Entry point of the application, setting up the GraphQL server.
- `src/schema.ts`: Defines the GraphQL schema for the API.

## Additional Information

For more detailed information on GraphQL Yoga and its capabilities, refer to the [GraphQL Yoga documentation](https://www.the-guild.dev/graphql/yoga-server).
