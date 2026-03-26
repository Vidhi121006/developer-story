import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const trail = trailRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' });
      gsap.to(trail, { x: mx, y: my, duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-trail" ref={trailRef} />
      
    </>
    
  );
}
