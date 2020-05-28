import { useRef, useEffect } from 'react';

// Inspired by https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}
