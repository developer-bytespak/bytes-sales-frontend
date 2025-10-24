import { useState } from 'react';

export function useCall() {
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState('idle');

  // Call management logic will be implemented here

  return {
    isCalling,
    callStatus,
    setIsCalling,
    setCallStatus,
  };
}
