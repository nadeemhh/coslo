'use client'; // Marks this as a Client Component

import { useState } from 'react';

export default function Team({ increment }) {
  const [count, setCount] = useState(1); // Initialize the counter with 1

  const handleIncrement = async () => {
    const newCount = await increment(count); // Call the server action
    setCount(newCount); // Update the state with the new count
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
