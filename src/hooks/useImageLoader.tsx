import { useState, useEffect } from 'react';

interface UseImageLoaderProps {
  src: string;
  preload?: boolean;
}

export const useImageLoader = ({ src, preload = true }: UseImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setLoaded(false);
    setError(false);
    
    if (!src) {
      setError(true);
      return;
    }
    
    if (preload) {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        setLoaded(true);
      };
      
      img.onerror = () => {
        setError(true);
      };
      
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [src, preload]);
  
  return { loaded, error };
};

export default useImageLoader; 