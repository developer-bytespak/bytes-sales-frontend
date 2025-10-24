import { useState } from 'react';

export function useEmail() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Email management logic will be implemented here

  return {
    emails,
    loading,
    setEmails,
  };
}
