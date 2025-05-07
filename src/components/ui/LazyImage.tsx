import React from 'react';
import useImageLoader from '../../hooks/useImageLoader';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  preload?: boolean;
  className?: string;
  placeholderClassName?: string;
  containerClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  preload = true,
  className = '',
  placeholderClassName = '',
  containerClassName = '',
  ...props
}) => {
  const { loaded, error } = useImageLoader({ src, preload });

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && !error && (
        <div className={`image-placeholder absolute inset-0 ${placeholderClassName}`}></div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30 text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};

export default LazyImage; 