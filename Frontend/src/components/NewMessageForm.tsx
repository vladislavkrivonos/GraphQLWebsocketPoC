import { useState } from 'react';
import { useMutation } from 'urql';

// Define a GraphQL mutation for creating and sending a new message
// This mutation accepts a 'value' parameter of type String and calls sendMessage with the provided message
const CreateMessageMutation = `
  mutation ($value: String!) {
    sendMessage(message: $value)
  }
`;

export function NewMessageForm() {
  const [value, setValue] = useState('');
  // Set up the mutation hook to execute the CreateMessageMutation
  // The first element of the array (mutation result) is ignored with the empty destructuring
  const [, executeMutation] = useMutation(CreateMessageMutation);

  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior which would refresh the page
    e.preventDefault();
    if (!value.trim()) return;
    // Execute the mutation to send the message with the current input value
    await executeMutation({ value });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for typing the message */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter message"
      />
      {/* Submit button to send the message */}
      <button type="submit">Send</button>
    </form>
  );
}
