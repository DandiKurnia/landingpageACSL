"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "up" | "in" | "fade";
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  threshold?: number;
  as?: React.ElementType;
}

export default function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  duration = 750,
  threshold = 0.05,
  className = "",
  as: Component = "div",
  style: customStyle,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fast-path: if reduced motion is enabled, reveal immediately to bypass observer
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        // Trigger slightly before element is fully in view for snappier experience
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const activeClass =
    variant === "up"
      ? "reveal-active"
      : variant === "in"
      ? "reveal-in-active"
      : "reveal-fade-active";

  const baseClass =
    variant === "up"
      ? "reveal-up"
      : variant === "in"
      ? "reveal-in"
      : "reveal-fade";

  const style = isVisible
    ? {
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        ...customStyle,
      }
    : {
        ...customStyle,
      };

  return (
    <Component
      ref={ref}
      style={style}
      className={`${baseClass} ${isVisible ? activeClass : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}
