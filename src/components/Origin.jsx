import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chapter1 from '../assets/images/chapter1.mp4';
import './Origin.css';
import useChapterNarration from "../hooks/useChapterNarration";

gsap.registerPlugin(ScrollTrigger);

export default function Origin() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const codeRef = useRef(null);
  const [codeVisible, setCodeVisible] = useState(false);
  useChapterNarration(sectionRef, "origin");

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Image parallax + reveal
      gsap.fromTo(imgRef.current,
        { y: 60, opacity: 0, filter: 'grayscale(100%) brightness(0.5)' },
        {
          y: 0, opacity: 1, filter: 'grayscale(0%) brightness(1)',
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: false,
            once: true,
          }
        }
      );

      // Parallax drift on image while scrolling
      gsap.to(imgRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Text lines stagger in
      const lines = textRef.current?.querySelectorAll('.origin-line');
      gsap.fromTo(lines,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );

      // Code block reveal
      gsap.fromTo(codeRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: codeRef.current,
            start: 'top 85%',
            once: true,
            onEnter: () => setCodeVisible(true),
          }
        }
      );

      // Chapter number
      gsap.fromTo('.origin-chapter',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="origin" className="origin" ref={sectionRef}>
      <div className="origin-bg-line" />

      <div className="origin-container">
        {/* Chapter label */}
        <div className="origin-chapter">
          <span className="chapter-num">01</span>
          <span className="chapter-line" />
          <span className="chapter-title">ORIGIN STORY</span>
        </div>

        <div className="origin-grid">
          {/* LEFT: Character */}
          <div className="origin-img-col">
            <div className="origin-img-wrap" ref={imgRef}>
              <video
                className="origin-img"
                src={chapter1}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="origin-img-overlay">
                <span className="oi-label">DAY 0 · FIRST RUN</span>
              </div>
              {/* Reaction bubble */}
              <div className="origin-bubble">
                <span>Wait… it listened?!</span>
                <span className="ob-emoji">🤯</span>
              </div>
              {/* Screen glow effect on face */}
              <div className="origin-screen-glow" />
            </div>
          </div>

          {/* RIGHT: Story */}
          <div className="origin-text" ref={textRef}>
            <h2 className="origin-heading">
              <span className="origin-line">The Day The</span>
              <span className="origin-line origin-heading-accent">Browser</span>
              <span className="origin-line">Listened</span>
            </h2>

            <p className="origin-quote origin-line">
              "I typed something. The browser obeyed.{' '}
              <em>That felt illegal.</em>"
            </p>

            <div className="origin-story-text">
              <p className="origin-line">
                It started with a blank file. A few lines were written,
                saved it as <code>.html</code>, and ran it in a browser.
              </p>
              <p className="origin-line">
                And suddenly — there was a heading. Real. Bold. <em>Existing.</em>
              </p>
              <p className="origin-line origin-thought">
                Wait… I just gave instructions… and it executed?
              </p>
              <p className="origin-line origin-realization">
                This is dangerous. I like this.
              </p>
            </div>

            {/* The code block */}
            <div className="origin-code" ref={codeRef}>
              <div className="oc-header">
                <div className="oc-dots">
                  <span style={{ background: '#ef4444' }} />
                  <span style={{ background: '#f59e0b' }} />
                  <span style={{ background: '#22c55e' }} />
                </div>
                <span className="oc-filename">index.html</span>
              </div>
              <div className="oc-body">
                <span className="oc-tag">&lt;h1&gt;</span>
                <span className={`oc-content ${codeVisible ? 'oc-type' : ''}`}>Hello World</span>
                <span className="oc-tag">&lt;/h1&gt;</span>
              </div>
              <div className="oc-note">
                At the time, this felt like power. Later you'd learn: this was the easiest thing you would ever do.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
