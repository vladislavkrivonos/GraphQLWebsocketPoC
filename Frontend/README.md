# React URQL Client

A React application demonstrating the use of URQL for GraphQL queries and subscriptions with WebSocket support.

## Running the Project

To run this project for development purposes, follow these steps:

1. **Install Dependencies**: Open your terminal, navigate to the project directory, and run `npm install` to install the necessary npm packages defined in `package.json`.
2. **Start Development Server**: Once the dependencies are installed, you can start the development server by running `npm run dev`. This will launch the application using Vite, and you should be able to access it in your browser at the default address (usually `http://localhost:5173` unless configured otherwise).

## URQL and GraphQL-WS Configuration

This project utilizes URQL, a highly customizable and lightweight GraphQL client for React, along with `graphql-ws` for WebSocket-based subscriptions. Below is an overview of the main configuration components:

- **Client Setup**: The URQL client is configured in `src/client.ts`. It is set up with exchanges for caching, deduplication, and WebSocket subscriptions. The client connects to a GraphQL server endpoint (ensure to configure the correct URL in the client setup) for queries and mutations, and uses `graphql-ws` for real-time subscriptions.
- **WebSocket Subscriptions**: The `graphql-ws` library is integrated to handle subscription operations over WebSocket, allowing real-time data updates. This is particularly used in components like `MessageList.tsx` for fetching and displaying live message updates.
- **Component Integration**: Components such as `MessageList.tsx` and `NewMessageForm.tsx` use URQL's hooks (`useQuery`, `useMutation`, `useSubscription`) to interact with the GraphQL API. The configuration ensures that queries are cached appropriately, mutations update the cache when necessary, and subscriptions maintain a persistent connection for real-time updates.
- **Environment Configuration**: Ensure that any environment variables or configuration settings for the GraphQL endpoint and WebSocket URL are correctly set in your development environment or in a `.env` file if applicable.

For detailed code and implementation specifics, refer to the source files in the `src` directory, particularly `client.ts` for client configuration and the components in `src/components` for usage examples.
