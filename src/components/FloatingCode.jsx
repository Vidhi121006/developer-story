import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './FloatingCode.css';

const snippets = [
  '<h1>Hello World</h1>',
  'git commit -m "pls work"',
  'while(alive) { code(); }',
  'console.log("why???")',
  'npm install everything',
  'undefined is not a function',
  '// TODO: fix later',
  'git push origin main',
  'import { hope } from "life"',
  'try { } catch { cry() }',
  'if (coffee === 0) panic()',
  '404: sleep not found',
  'sudo make me a sandwich',
  '3:47 AM — still going',
  'merge conflict in life.jsx',
];

export default function FloatingCode({ density = 12 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.fc-item');
    if (!els) return;

    els.forEach((el, i) => {
      gsap.set(el, {
        x: Math.random() * 100 + 'vw',
        y: Math.random() * 100 + 'vh',
        opacity: 0,
        rotation: (Math.random() - 0.5) * 20,
      });
      gsap.to(el, {
        opacity: Math.random() * 0.08 + 0.02,
        duration: 1,
        delay: Math.random() * 3,
      });
      gsap.to(el, {
        y: `-=${Math.random() * 120 + 60}`,
        x: `+=${(Math.random() - 0.5) * 60}`,
        duration: Math.random() * 25 + 20,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        delay: Math.random() * 5,
      });
    });
  }, []);

  return (
    <div className="floating-code" ref={containerRef} aria-hidden="true">
      {Array.from({ length: density }).map((_, i) => (
        <span
          key={i}
          className="fc-item"
          style={{ fontSize: `${Math.random() * 0.3 + 0.6}rem` }}
        >
          {snippets[i % snippets.length]}
        </span>
      ))}
    </div>
  );
}
