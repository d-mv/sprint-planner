import { useEffect } from 'react';

interface UseKeyPressProps {
  onEscape?: (e: KeyboardEvent) => void;
  onEnter?: (e: KeyboardEvent) => void;
  onArrowDown?: (e: KeyboardEvent) => void;
  onArrowUp?: (e: KeyboardEvent) => void;
  onKey?: (key: string) => void;
}

export function useKeyPress({ onEnter, onEscape, onArrowDown, onArrowUp, onKey }: UseKeyPressProps, isOn = true) {
  function handleKeys(e: KeyboardEvent) {
    if (e.cancelBubble) {
      return;
    }

    if (e.key === 'Escape' && onEscape) onEscape(e);

    if (e.key === 'Enter' && !e.shiftKey && onEnter) onEnter(e);

    if (e.key === 'ArrowDown' && onArrowDown) onArrowDown(e);

    if (e.key === 'ArrowUp' && onArrowUp) onArrowUp(e);

    if (onKey) onKey(e.key);
  }

  useEffect(() => {
    if (isOn) {
      document.addEventListener('keydown', handleKeys);

      return () => {
        document.removeEventListener('keydown', handleKeys);
      };
    }
  }, [isOn, onEscape, onEnter, onArrowDown, onArrowUp, onKey]);
}
