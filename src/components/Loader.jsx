import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const bootLines = [
  { text: '> INITIALIZING SYSTEM...', delay: 0, color: '#22c55e' },
  { text: '> LOADING: core_engine_v4.exe', delay: 0.3, color: '#c8c8d4' },
  { text: '> MOUNTING: /dev/curiosity_core', delay: 0.55, color: '#c8c8d4' },
  { text: '> WARNING: coffee_dependency detected', delay: 0.8, color: '#f97316' },
  { text: '> IMPORTING: debugging_module [████░░] 68%', delay: 1.05, color: '#c8c8d4' },
  { text: '> ERROR: sleep not found — continuing anyway', delay: 1.3, color: '#ef4444' },
  { text: '> COMPILING: developer_lifecycle.jsx', delay: 1.55, color: '#c8c8d4' },
  { text: '> BUILD SUCCESS ✓', delay: 1.9, color: '#22c55e' },
  { text: '> LAUNCHING EXPERIENCE...', delay: 2.1, color: '#f97316' },
];

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lineIndex = 0;
    const timers = [];

    bootLines.forEach((line, i) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
      }, line.delay * 1000);
      timers.push(t);
    });

    const exitTimer = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.in',
        onComplete,
      });
    }, 3200);
    timers.push(exitTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      
      <div className="loader-inner">
        <div><span className="theme">LIFE OF A DEVELOPER</span></div>
        <div className="loader-top">
          <span className="loader-tag">[SYSTEM BOOT]</span>
          <span className="loader-version">build v4.0.0</span>
        </div>
        <div className="loader-terminal">
          {lines.map((line, i) => (
            <div key={i} className="loader-line" style={{ color: line.color }}>
              <span className="line-text">{line.text}</span>
              {i === lines.length - 1 && <span className="blink-cursor">_</span>}
            </div>
          ))}
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-bg">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="loader-percent">{progress}%</span>
        </div>
        <div className="loader-name">404 — Life Not Found</div>
      </div>
    </div>
  );
}
