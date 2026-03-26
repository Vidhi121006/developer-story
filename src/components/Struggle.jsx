import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chapter2 from '../assets/images/chapter2.mp4';
import './Struggle.css';
import useChapterNarration from "../hooks/useChapterNarration";

gsap.registerPlugin(ScrollTrigger);

const errorStack = [
  { code: 'Error: Confidence not found', type: 'error' },
  { code: "Suggestion: Try actually understanding the topic", type: 'hint' },
  { code: 'at shallow_knowledge.js:404', type: 'trace' },
  { code: 'at surface_level.js:∞', type: 'trace' },
];

const cards = [
  { icon: '📚', label: 'THE WORDS', desc: 'Syntax memorized. Context: zero.' },
  { icon: '📋', label: 'THE FORMAT', desc: 'Perfect structure. Wrong understanding.' },
  { icon: '🫧', label: 'THE ILLUSION', desc: 'Looked like knowledge. Wasn\'t.' },
];

export default function Struggle() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const errorRef = useRef(null);
  const cardsRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);
  useChapterNarration(sectionRef, "struggle");

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Parallax on image (opposite direction for contrast)
      gsap.to(imgRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Image reveal with glitch
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.fromTo(imgRef.current,
            { opacity: 0, scale: 0.9, filter: 'hue-rotate(90deg) contrast(1.5)' },
            { opacity: 1, scale: 1, filter: 'hue-rotate(0deg) contrast(1)', duration: 0.8, ease: 'power2.out' }
          );
        }
      });

      // Error lines cascade
      const errorLines = errorRef.current?.querySelectorAll('.err-line');
      gsap.fromTo(errorLines,
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, stagger: 0.18, duration: 0.5, ease: 'power1.out',
          scrollTrigger: { trigger: errorRef.current, start: 'top 80%', once: true }
        }
      );

      // Cards stagger
      const cardEls = cardsRef.current?.querySelectorAll('.struggle-card');
      gsap.fromTo(cardEls,
        { opacity: 0, y: 30, rotation: 2 },
        {
          opacity: 1, y: 0, rotation: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true }
        }
      );

      // Heading reveal
      gsap.fromTo('.struggle-heading .sh-word',
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="struggle" className="struggle" ref={sectionRef}>
      <div className="struggle-noise" />

      <div className="struggle-container">
        <div className="struggle-chapter">
          <span className="chapter-num" style={{ color: 'rgba(239,68,68,0.1)' }}>02</span>
          <span className="chapter-line" />
          <span className="chapter-title">THE HONEST MISTAKE</span>
        </div>

        <div className="struggle-grid">
          {/* LEFT: Story + error */}
          <div className="struggle-text-col">
            <h2 className="struggle-heading">
              {'The One Who Thought They'.split('  ').map((w, i) => (
                <span key={i} className="sh-word">{w} </span>
              ))}
              <br />
              <span className="sh-word struggle-accent">Knew</span>
              <span className="sh-word"> Everything</span>
            </h2>

            <p className="struggle-sub">
              "I could explain everything. Building it was another story.{' '}
              <em>Understanding it was optional.</em>"
            </p>

            <p className="struggle-body">
              You could talk about systems, tools, patterns.
              Perfect answers. Perfect structure. Zero understanding.
            </p>

            <p className="struggle-body">
              Then someone asked: <span className="struggle-q">"But why does it work?"</span>
            </p>

            <p className="struggle-body">
              And suddenly —
            </p>

            {/* Error terminal */}
            <div className="struggle-terminal" ref={errorRef}>
              <div className="st-header">
                <span className="st-dot" style={{ background: '#ef4444' }} />
                <span className="st-dot" style={{ background: '#f59e0b' }} />
                <span className="st-dot" style={{ background: '#22c55e' }} />
                <span className="st-title">STDERR</span>
              </div>
              {errorStack.map((e, i) => (
                <div key={i} className={`err-line err-${e.type}`}>
                  {e.type === 'error' && <span className="err-icon">✗</span>}
                  {e.type === 'hint' && <span className="err-icon">→</span>}
                  {e.type === 'trace' && <span className="err-icon"> </span>}
                  <span>{e.code}</span>
                </div>
              ))}
            </div>

            <p className="struggle-body struggle-conclusion">
              Memorizing is fast. Understanding is slow.{' '}
              <span className="struggle-em">And unavoidable.</span>
            </p>
          </div>

          {/* RIGHT: Image + cards */}
          <div className="struggle-visual-col">
            <div className="struggle-img-wrap" ref={imgRef}>
              <video
              className="origin-img"
              src={chapter2}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              />
              {/* Overlay effect to suggest stress */}
              <div className="struggle-img-vignette" />
              <div className="struggle-img-glitch-layer" />
              <div className="struggle-stat">
                <span className="ss-label">VISIBLE RESULTS</span>
                <span className="ss-val">IMPRESSIVE</span>
              </div>
              <div className="struggle-stat struggle-stat--2">
                <span className="ss-label">ACTUAL UNDERSTANDING</span>
                <span className="ss-val ss-red">???</span>
              </div>
            </div>

            {/* The three things rote gives you */}
            <div className="struggle-cards" ref={cardsRef}>
              {cards.map((card, i) => (
                <div
                  key={i}
                  className={`struggle-card ${expandedCard === i ? 'expanded' : ''}`}
                  onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                >
                  <div className="sc-top">
                    <span className="sc-icon">{card.icon}</span>
                    <span className="sc-label">{card.label}</span>
                    <span className="sc-toggle">{expandedCard === i ? '−' : '+'}</span>
                  </div>
                  {expandedCard === i && (
                    <p className="sc-desc">{card.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
