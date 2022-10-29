import { useState } from 'react';

export function useTestStatus() {
  const [count, setCount] = useState<number>(0);

  return { count, setCount };
}
