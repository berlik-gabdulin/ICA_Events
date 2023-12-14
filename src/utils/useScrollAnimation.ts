import { useEffect, useRef } from 'react';

export const useScrollAnimation = (animationName: string, offset = 200, delay = 0) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            const targetElement = entry.target as HTMLElement;
            targetElement.style.visibility = 'visible';
            targetElement.classList.add('animate__animated', animationName);
          }, delay);
        }
      },
      {
        rootMargin: `${-offset}px`,
      }
    );

    const currentElement = elementRef.current as unknown as HTMLElement;
    if (currentElement) {
      currentElement.style.visibility = 'hidden';
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [animationName, offset, delay]);

  return elementRef;
};
