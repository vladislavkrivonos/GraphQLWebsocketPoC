import { createPubSub, createSchema } from "graphql-yoga";
import { v4 as uuidv4 } from 'uuid';
import { setTimeout as setTimeout$ } from 'node:timers/promises'

// Define your type definitions and resolvers
const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    value: String!
  }

  type Query {
    messages: [Message!]!
    message(id: ID!): Message
  }

  type Mutation {
    createMessage(value: String!): Message!
    updateMessage(id: ID!, value: String!): Message
    deleteMessage(id: ID!): Message
  }

  type Subscription {
    messageEvent: MessageEvent!
    countdown(from: Int!): Int!
  }

  type MessageEvent {
    type: String!
    message: Message!
  }
`;

const messages: { id: string; value: string }[] = [];

const pubSub = createPubSub();
const MESSAGE_EVENT = 'MESSAGE_EVENT';

const resolvers = {
  Query: {
    messages: () => messages,
    message: (_: any, { id }: { id: string }) => messages.find((m) => m.id === id),
  },
  Mutation: {
    createMessage: (_: any, { value }: { value: string }) => {
      const message = { id: uuidv4(), value };
      messages.push(message);
      pubSub.publish(MESSAGE_EVENT, { messageEvent: { type: 'CREATED', message } });
      return message;
    },
    updateMessage: (_: any, { id, value }: { id: string; value: string }) => {
      const message = messages.find((m) => m.id === id);
      if (!message) return null;
      message.value = value;
      pubSub.publish(MESSAGE_EVENT, { messageEvent: { type: 'UPDATED', message } });
      return message;
    },
    deleteMessage: (_: any, { id }: { id: string }) => {
      const index = messages.findIndex((m) => m.id === id);
      if (index === -1) return null;
      const [deleted] = messages.splice(index, 1);
      pubSub.publish(MESSAGE_EVENT, { messageEvent: { type: 'DELETED', message: deleted } });
      return deleted;
    },
  },
  Subscription: {
    messageEvent: {
      subscribe: () => pubSub.subscribe(MESSAGE_EVENT),
      resolve: (payload: any) => payload.messageEvent,
    },
    countdown: {
      // This will return the value on every 1 sec until it reaches 0
      subscribe: async function* (_, { from }) {
        for (let i = from; i >= 0; i--) {
          await setTimeout$(1000)
          yield { countdown: i }
        }
      }
    }
  },
};

export const schema = createSchema({ typeDefs, resolvers });