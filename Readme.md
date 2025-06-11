# React GraphQL Proof of Concept (PoC)

This repository contains a proof of concept project demonstrating the integration of a GraphQL server with a React frontend using URQL for queries and subscriptions. The project is divided into two main components: Backend and Frontend.

## Project Structure

- **Backend**: Contains the GraphQL server built with GraphQL Yoga, providing a robust and scalable API for client applications.
- **Frontend**: Contains a React application that uses URQL for interacting with the GraphQL server through queries, mutations, and real-time subscriptions via WebSocket.

## Backend - GraphQL Yoga Server

The Backend folder hosts a GraphQL server designed to provide a robust API for client applications.

### Getting Started

#### Prerequisites
- Node.js and npm must be installed on your system.

#### Installation
1. Navigate to the `Backend` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

#### Running the Server
- To launch the server:
  ```bash
  npm run start
  ```
  This will execute the server using `ts-node`. The server will be available at the default port configured in the application.
- For development with automatic restarts on file changes:
  ```bash
  npm run dev
  ```
  This uses `nodemon` to watch for changes in the `src` directory and restart the server automatically.

For more details on the libraries used and project structure, refer to the [Backend README](./Backend/README.md).

## Frontend - React URQL Client

The Frontend folder contains a React application demonstrating the use of URQL for GraphQL queries and subscriptions with WebSocket support.

### Running the Project

1. **Install Dependencies**: Navigate to the `Frontend` directory and run:
   ```bash
   npm install
   ```
   to install the necessary npm packages defined in `package.json`.
2. **Start Development Server**: Run:
   ```bash
   npm run dev
   ```
   This will launch the application using Vite, accessible in your browser at the default address (usually `http://localhost:5173` unless configured otherwise).

For detailed information on URQL and GraphQL-WS configuration, refer to the [Frontend README](./Frontend/README.md).

## Interconnecting Backend and Frontend

To ensure the Frontend application can communicate with the Backend server, follow these steps:

1. **Start the Backend Server**:
   - Navigate to the `Backend` directory and run `npm run start` or `npm run dev` to start the GraphQL server. Ensure it is running on the default or configured port (check the Backend configuration for the exact port, often `4000` by default for GraphQL Yoga).
2. **Configure Frontend Client**:
   - In the Frontend project, ensure the URQL client in `src/client.ts` is configured to connect to the correct GraphQL server endpoint. The URL should match the Backend server's address, typically something like `http://localhost:4000/graphql` for HTTP queries and `ws://localhost:4000/graphql` for WebSocket subscriptions.
3. **Start the Frontend Application**:
   - Navigate to the `Frontend` directory and run `npm run dev` to start the development server. Access the application in your browser to interact with the GraphQL API provided by the Backend.

By following these steps, the Frontend will be able to send queries, mutations, and subscriptions to the Backend server, enabling real-time data updates and interactions as demonstrated in components like `MessageList.tsx` and `NewMessageForm.tsx`.

## Additional Notes

- Ensure both Backend and Frontend are running simultaneously for full functionality.
- If you encounter connection issues, verify the GraphQL endpoint URLs in the Frontend client configuration and ensure the Backend server is accessible at those addresses.
- For further customization or scaling, refer to the individual README files in each directory for advanced configuration options and library documentation.
