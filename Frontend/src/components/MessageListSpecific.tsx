import { useSubscription } from 'urql';

// Define a GraphQL subscription to listen for real-time updates
// This subscription listens for 'greetings' events from the server
const MessageEventSubSpecific = `
  subscription ($value: String!) {
    specific(topic: $value)
  }
`

export function MessageListSpecific() {
  // Set up a subscription to receive real-time message updates
  // The second argument is a reducer function that processes incoming data
  const [result] = useSubscription({ query: MessageEventSubSpecific, variables: {value: 'SPECIFIC_TOPIC'} }, (messages = [], response) => {
    console.log(response);

    return [response.specific, ...messages];
  });

  // If no data is available yet, display a placeholder message
  if (!result.data) {
    return <p>No new SPECIFIC messages</p>;
  }

  return (
    <>
        <p>Specific</p>
        <ul>
        {result.data.map((msg: any) => {
            const res = JSON.parse(msg);
            return (<li key={res.message}>{res.message}</li>)
        }
        )}
        </ul>
    </>
  );
}
