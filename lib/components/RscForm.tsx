"use client";
import React, { useState } from "react";

interface Props {
  onSend: (formData: FormData) => Promise<string>;
}

export const RscForm: React.FC<Props> = ({ onSend }) => {
  const [sendCount, setSendCount] = useState(0);
  const [response, setResponse] = useState('');

  return (
    <form 
      action={async (formData: FormData) => {
        setSendCount((count) => count + 1);
        const response = await onSend(formData);
        setResponse(response);
      }}
    >
      <p>This form has been sent {sendCount} times</p>
      <label>Message:
        <input type="text" name="message" />
      </label>
      <button>Send</button>
      <p>Response: {response}</p>
    </form>
  );
};
