import { useEffect, useRef, useState } from "react";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "fade-in" | "slide-up";

interface UseScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = ({
  type = "fade-up",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -100px 0px",
  triggerOnce = false,
}: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
            setHasAnimated(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  const getAnimationClass = () => {
    if (!isVisible && !hasAnimated) {
      const baseClasses = "opacity-0 transition-all duration-500 ease-out";
      switch (type) {
        case "fade-up":
          return `${baseClasses} translate-y-4`;
        case "fade-left":
          return `${baseClasses} -translate-x-4`;
        case "fade-right":
          return `${baseClasses} translate-x-4`;
        case "fade-in":
          return baseClasses;
        case "slide-up":
          return `${baseClasses} translate-y-8`;
        default:
          return baseClasses;
      }
    }
    return "opacity-100 translate-x-0 translate-y-0 transition-all duration-500 ease-out";
  };

  return {
    ref: elementRef,
    className: getAnimationClass(),
    style: delay > 0 ? { transitionDelay: `${delay}ms` } : undefined,
  };
};
