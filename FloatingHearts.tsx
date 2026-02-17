import { useEffect, useRef } from "react";

interface FloatingHeartsProps {
  count?: number;
  slow?: boolean;
}

export function FloatingHearts({ count = 15, slow = false }: FloatingHeartsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const hearts: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.className = "absolute pointer-events-none";
      
      const size = Math.random() * 20 + 16;
      const startX = Math.random() * 100;
      const duration = slow ? Math.random() * 5 + 8 : Math.random() * 5 + 5;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.5 + 0.3;

      heart.style.cssText = `
        left: ${startX}%;
        bottom: -50px;
        font-size: ${size}px;
        opacity: ${opacity};
        animation: floatUp ${duration}s ease-in-out ${delay}s infinite;
        will-change: transform, opacity;
      `;

      container.appendChild(heart);
      hearts.push(heart);
    }

    return () => {
      hearts.forEach((heart) => heart.remove());
    };
  }, [count, slow]);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1]" />
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity, 0.5);
          }
          90% {
            opacity: var(--opacity, 0.5);
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}