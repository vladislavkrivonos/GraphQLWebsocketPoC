import { createClient, subscriptionExchange, cacheExchange, fetchExchange, } from 'urql';
import { createClient as createWSClient } from 'graphql-ws';

// Initialize a WebSocket client for handling GraphQL subscriptions over WebSocket protocol
const wsClient = createWSClient({
  // Specify the WebSocket endpoint for GraphQL subscriptions
  url: 'ws://localhost:4000/graphql',
  // Define connection parameters for the WebSocket connection
  connectionParams: async () => {
    // This function is called when the socket connects (or reconnects)
    return {
      headers: {
        Authorization: `Bearer your_access_token`, // Replace with your auth logic
      },
      someCustomParam: 'value',
    };
  },
  // Enable lazy mode, meaning the WebSocket connection is only established when a subscription is initiated
  lazy: true,
});

// Create and export the main urql client for GraphQL operations
export const client = createClient({
  // Define the HTTP endpoint for GraphQL queries and mutations
  url: 'http://localhost:4000/graphql',
  // Configure fetch options for HTTP requests
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  // Set up the exchanges for processing GraphQL operations
  exchanges: [
    // cacheExchange handles caching of query results to optimize performance
    cacheExchange,
    // fetchExchange handles standard HTTP requests for queries and mutations
    fetchExchange,
    // subscriptionExchange integrates WebSocket subscriptions with the urql client
    subscriptionExchange({
      // Define how subscription requests are forwarded to the WebSocket client
      forwardSubscription(request) {
        const input = { ...request, query: request.query || '' };
        return {
          subscribe(sink) {
            console.log('sub called');
            const sub = wsClient.subscribe(input, sink);
            const unsubscribe = () => {
              console.log('unsub called');
              return sub();
            };

            // const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});
