import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import vidhiImg from '../assets/images/vidhi.jpeg';
import './Hero.css';
import useChapterNarration from "../hooks/useChapterNarration";

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  useChapterNarration(sectionRef, "prologue");
  const matrixRef = useRef(null);
  const matrixInterval = useRef(null);

  const startMatrixRain = () => {
    const canvas = matrixRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22c55e";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 1.0) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    canvas.style.opacity = "1";

    matrixInterval.current = setInterval(draw, 150);
  };

  const stopMatrixRain = () => {
    clearInterval(matrixInterval.current);
    if (matrixRef.current) {
      matrixRef.current.style.opacity = "0";
    }
  };

  const handleThemeClick = () => {
    startMatrixRain();

    setTimeout(() => {
      stopMatrixRain();
    }, 4000);
  };
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(imgRef.current,
      { scale: 0.85, opacity: 0, filter: 'blur(12px) grayscale(100%)' },
      { scale: 1, opacity: 1, filter: 'blur(0px) grayscale(0%)', duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(titleRef.current.querySelectorAll('.hero-word'),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(tagsRef.current.children,
      { opacity: 0, y: 16, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.4 },
      '-=0.3'
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    );

    gsap.to(imgRef.current, {
      y: -12,
      duration: 3.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    const glitchInterval = setInterval(() => {
      const h = titleRef.current;
      if (!h) return;
      gsap.to(h, { x: 3, duration: 0.05, yoyo: true, repeat: 5 });
    }, 6000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(matrixInterval.current); 
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>

      {/*MATRIX CANVAS */}
      <canvas ref={matrixRef} className="matrix-canvas"></canvas>

      {/* TOP CLICKABLE THEME */}
      <div className="hero-theme-top" onClick={handleThemeClick}>
        <span className="theme-main">LIFE</span>
        <span className="theme-accent">OF A</span>
        <span className="theme-main highlight">DEVELOPER</span>
      </div>

      {/* Ambient */}
      <div className="hero-orb hero-orb--amber" />
      <div className="hero-orb hero-orb--blue" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-status">
            <span className="status-dot" />
            <span className="status-label">BUILD v4 · STILL COMPILING</span>
          </div>

          <h1 className="hero-title" ref={titleRef}>
            {'404'.split('').map((c, i) => (
              <span key={i} className="hero-word hero-title-big">{c}</span>
            ))}
            <br />
            <span className="hero-word hero-title-sub">Life</span>
            <span className="hero-word hero-title-sub hero-title-dim"> Not </span>
            <span className="hero-word hero-title-sub">Found</span>
          </h1>

          <p className="hero-subtitle" ref={subtitleRef}>
            A slightly inaccurate, mostly true story about building <br/>
            with HTML, fighting bugs, surviving deadlines,<br />
            and the developer journey.
          </p>

          <div className="hero-tags" ref={tagsRef}>
            {['HTML → ∞', '2AM commits', 'Ship > Perfect', 'Still Compiling', 'Iteration 4'].map(tag => (
              <span key={tag} className="hero-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <div className="hero-img-frame">
              <img ref={imgRef} src={vidhiImg} className="hero-img" />
            </div>
          </div>
        </div>
      </div>
      <br/><br/><br/><br/>
      <div className="scroll-indicator" ref={scrollIndicatorRef}>
        <span>SCROLL TO CONTINUE</span>
        <div className="scroll-line">
          <div className="scroll-line-inner"></div>
        </div>
      </div>
    </section>
  );
}