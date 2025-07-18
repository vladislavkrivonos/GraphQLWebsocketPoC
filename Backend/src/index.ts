import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { createPubSub } from 'graphql-yoga';

const pubSub = createPubSub<{
  MESSAGE_EVENT: [topic: string, payload: { messageEvent: {type: string, message: string} }]
}>();
const MESSAGE_EVENT = 'MESSAGE_EVENT';
const SPECIFIC_TOPIC = 'SPECIFIC_TOPIC';
const GENERAL_TOPIC = 'GENERAL_TOPIC';

// Define your GraphQL schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      sendMessage: {
        type: GraphQLString,
        args: {
          message: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, { message }) => {
          const strMessage = message as string;
          console.log(strMessage);
          if (strMessage.startsWith(SPECIFIC_TOPIC)) {
            console.log('created specific');
            pubSub.publish(MESSAGE_EVENT, GENERAL_TOPIC, { messageEvent: { type: 'CREATED', message } });
            pubSub.publish(MESSAGE_EVENT, SPECIFIC_TOPIC, { messageEvent: { type: 'CREATED', message } }); // Specific topic publish
          } else {
            console.log('created normal');
            pubSub.publish(MESSAGE_EVENT, GENERAL_TOPIC, { messageEvent: { type: 'CREATED', message } });
          }
          return `Sent: ${message}`;
        },
      },
    },
  }),
  subscription: new GraphQLObjectType({
    name: 'Subscription',
    fields: {
      greetings: {
        type: GraphQLString,
        subscribe: () => pubSub.subscribe(MESSAGE_EVENT, GENERAL_TOPIC),
        resolve: (payload: any) => JSON.stringify(payload.messageEvent),
      },
      specific: {
        type: GraphQLString,
        args: {
          topic: { type: new GraphQLNonNull(GraphQLString) },
        },
        subscribe: (_parent, args, _context, _info) => {
          console.log(args);
          const { topic } = args;
          console.log(topic);
          return pubSub.subscribe(MESSAGE_EVENT, topic);
        },
        resolve: (payload: any) => JSON.stringify(payload.messageEvent),
      }
    },
  }),
});

// Create an Express application
const app = express();

// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors({ origin: '*' }));

// Apply the GraphQL HTTP middleware
app.use(
  '/graphql',
  createHandler({
    schema,
  })
);

// Create an HTTP server
const server = createServer(app);

// Set up the WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server,
  path: '/graphql',
});

// Use the GraphQL WebSocket server
useServer({ schema }, wsServer);

// Start the server
server.listen(4000, () => {
  console.log('GraphQL server is running at http://localhost:4000/graphql');
});
