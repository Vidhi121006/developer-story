import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import final from '../assets/images/final.mp4';
import './Final.css';

gsap.registerPlugin(ScrollTrigger);

const warnings = [
  'concepts not fully understood yet',
  'bugs you haven\'t solved yet',
  'ideas you haven\'t built yet',
  'skills still installing...',
];

const statusLines = [
  { label: 'status', value: 'running', color: '#22c55e' },
  { label: 'version', value: 'v4.0-beta', color: '#f97316' },
  { label: 'errors', value: '0', color: '#22c55e' },
  { label: 'warnings', value: '∞', color: '#f59e0b' },
  { label: 'next_build', value: 'unknown', color: '#8b5cf6' },
  { label: 'shutdown', value: 'REFUSED', color: '#ef4444' },
];

export default function Final() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Big dramatic entrance on image
      gsap.fromTo(imgRef.current,
        {
          scale: 0.8,
          opacity: 0,
          filter: 'grayscale(100%) brightness(0.3) blur(8px)',
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'grayscale(0%) brightness(1.05) blur(0px)',
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

      // Parallax drift
      gsap.to(imgRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Title BIG entrance
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 1.2, filter: 'blur(10px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true }
        }
      );

      // Status lines
      gsap.fromTo('.final-status-line',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.final-terminal', start: 'top 82%', once: true }
        }
      );

      // Warnings
      gsap.fromTo('.final-warning-item',
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power1.out',
          scrollTrigger: { trigger: '.final-warnings', start: 'top 85%', once: true }
        }
      );

      // Pulsing glow on image
      gsap.to('.final-img-glow', {
        opacity: 0.3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="final" className="final" ref={sectionRef}>
      <div className="final-scanlines" />

      <div className="final-container">
        <div className="final-chapter">
          <span className="chapter-num" style={{ color: 'rgba(34,197,94,0.1)' }}>∞</span>
          <span className="chapter-line" />
          <span className="chapter-title">STILL COMPILING</span>
        </div>

        <div className="final-grid">
          {/* LEFT: Big title + status */}
          <div className="final-text-col">
            <h2 className="final-title" ref={titleRef}>
              <span className="ft-line ft-dim">Still</span>
              <span className="ft-line ft-big">Compiling</span>
              <span className="ft-line ft-small">— and that's the point</span>
            </h2>

            <div className="final-warnings">
              <div className="fw-header">
                <span className="fw-icon">⚠</span>
                <span>ACTIVE WARNINGS</span>
              </div>
              {warnings.map((w, i) => (
                <div key={i} className="final-warning-item">
                  <span className="fwi-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>

            <div className="final-terminal">
              <div className="ft-term-header">
                <div className="fth-dots">
                  <span style={{ background: '#ef4444' }} />
                  <span style={{ background: '#f59e0b' }} />
                  <span style={{ background: '#22c55e' }} />
                </div>
                <span className="fth-name">build_output.log</span>
              </div>
              {statusLines.map((line, i) => (
                <div key={i} className="final-status-line">
                  <span className="fsl-key">{line.label}</span>
                  <span className="fsl-colon">:</span>
                  <span className="fsl-val" style={{ color: line.color }}>{line.value}</span>
                </div>
              ))}
              <div className="final-cursor-line">
                <span className="final-cursor-dot" />
                <span className="final-cursor-text">awaiting next commit</span>
              </div>
            </div>

            <p className="final-body">
              You are not done. Not even close.
            </p>
            <p className="final-body">
              You have bugs you haven't solved, systems you don't fully understand,
              and projects you haven't shipped yet.
            </p>
            <p className="final-body final-good">
              Good. That means you're still moving.
            </p>
          </div>

          {/* RIGHT: Image — glowing final character shot */}
          <div className="final-visual-col">
            <div className="final-img-wrap" ref={imgRef}>
              <div className="final-img-glow" />
              <video
                className="origin-img"
                src={final}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              {/* Compile status HUD */}
              <div className="final-hud">
                <div className="fhud-row">
                  <span className="fhud-dot" />
                  <span>SYSTEM RUNNING</span>
                </div>
                <div className="fhud-bar">
                  <div className="fhud-fill" />
                </div>
                <div className="fhud-row fhud-row--bottom">
                  <span>PROGRESS</span>
                  <span className="fhud-pct">∞%</span>
                </div>
              </div>
            </div>

            {/* Closing thought */}
            <div className="final-closing">
              <div className="fc-quote">
                Somewhere, there's still that first piece of code.
                A simple heading. A quiet beginning.
                And everything that followed.
              </div>
              <div className="fc-code">
                <span className="fcc-tag">&lt;h1&gt;</span>
                <span className="fcc-content">Hello World</span>
                <span className="fcc-tag">&lt;/h1&gt;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom — final big statement */}
        <div className="final-footer">
          <div className="ff-line">No errors.</div>
          <div className="ff-line ff-line--dim">Just warnings.</div>
          <div className="ff-line ff-line--em">And a system that refuses to shut down.</div>
        </div>
      </div>
    </section>
  );
}
