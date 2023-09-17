"use client";
import React, { useState } from "react";

interface Props {
  onSend: (formData: FormData) => void;
}

export const RscForm: React.FC<Props> = ({ onSend }) => {
  const [sendCount, setSendCount] = useState(0);

  return (
    <form 
      action={(formData: FormData) => {
        setSendCount((count) => count + 1);
        onSend(formData);
      }}
    >
      <p>This form has been sent {sendCount} times</p>
      <input type="text" name="name" />
      <button>Send</button>
    </form>
  );
};
