import React, { useCallback, useEffect, useState } from 'react';

interface UseTypewriterOptions {
  text: string | string[];
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
}

const useTypewriter = ({
  text,
  delay = 100,
  loop = false,
  loopDelay = 2000
}: UseTypewriterOptions) => {
  // Convert single string to array for consistent handling
  const phrases = Array.isArray(text) ? text : [text];

  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const currentPhrase = phrases[phraseIndex];

  const reset = useCallback(() => {
    setDisplayText('');
    setPhraseIndex(0);
    setIsDeleting(false);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Finished typing current phrase
      if (!isDeleting && displayText === currentPhrase) {
        if (loop) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, loopDelay);
        } else {
          setIsTyping(false);
        }
      }
      // Finished deleting current phrase
      else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        // Move to next phrase
        setPhraseIndex(prevIndex => (prevIndex + 1) % phrases.length);
      }
      // Currently typing or deleting
      else {
        timeout = setTimeout(() => {
          setDisplayText(
            isDeleting
              ? currentPhrase.substring(0, displayText.length - 1)
              : currentPhrase.substring(0, displayText.length + 1)
          );
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isTyping, currentPhrase, phrases, delay, loop, loopDelay]);

  return {
    displayText,
    isTyping,
    phraseIndex,
    reset
  };
};

export default useTypewriter;