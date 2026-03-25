import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Nav.css';

const sections = ['Hero', 'Origin', 'Struggle', 'Deadline', 'Growth', 'Final'];

export default function Nav() {
  const navRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const idx = sections.findIndex(s => s.toLowerCase() === id.toLowerCase());
          if (idx !== -1) setActive(idx);
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => {
      const el = document.getElementById(s.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav-logo">
        <span className="nav-logo-bracket">&lt;</span>
        <span>VK</span>
        <span className="nav-logo-bracket">/&gt;</span>
      </div>
      <ul className="nav-dots">
        {sections.map((s, i) => (
          <li key={s}>
            <a
              href={`#${s.toLowerCase()}`}
              className={`nav-dot ${i === active ? 'active' : ''}`}
              title={s}
            >
              <span className="nav-dot-label">{s}</span>
              <span className="nav-dot-circle" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
