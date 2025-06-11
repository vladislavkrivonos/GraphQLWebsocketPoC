import { useQuery, useSubscription } from 'urql';

// Define a GraphQL query to fetch initial data
// This query requests the 'hello' field from the server
const MessagesQuery = `
  query {
    hello
  }
`;

// Define a GraphQL subscription to listen for real-time updates
// This subscription listens for 'greetings' events from the server
const MessageEventSub = `
  subscription {
    greetings
  }
`;

export function MessageList() {
  // Initialize the query hook but only use the executeQuery function
  // The first element of the array (query result) is ignored with the empty destructuring
  const [, executeQuery] = useQuery({ query: MessagesQuery });

  // Set up a subscription to receive real-time message updates
  // The second argument is a reducer function that processes incoming data
  const [result] = useSubscription({ query: MessageEventSub }, (messages = [], response) => {
    console.log(response);

    return [response.greetings, ...messages];
  });

  // If no data is available yet, display a placeholder message
  if (!result.data) {
    return <p>No new messages</p>;
  }

  return (
    <ul>
      {result.data.map((msg: any) => {
        const res = JSON.parse(msg);
        return (<li key={res.message}>{res.message}</li>)
      }
      )}
    </ul>
  );
}
