import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chapter4 from '../assets/images/chapter4.mp4';
import './Growth.css';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { time: '9:00 AM', event: 'Walk in confident', mood: '😎', color: '#22c55e' },
  { time: '11:30 AM', event: 'Question your skills', mood: '😬', color: '#f59e0b' },
  { time: '2:00 PM', event: 'Question your idea', mood: '😰', color: '#f97316' },
  { time: '4:00 PM', event: 'Question your existence', mood: '😭', color: '#ef4444' },
  { time: '6:00 PM', event: 'Keep going. Build.', mood: '💪', color: '#3b82f6' },
  { time: '8:00 PM', event: 'Ship. Survive.', mood: '🎯', color: '#8b5cf6' },
  { time: 'RESULT', event: 'Above Average. Not luck. Proof.', mood: '🏆', color: '#f97316' },
];

export default function Growth() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Image: brighten and scale as you scroll to this section
      gsap.fromTo(imgRef.current,
        { scale: 0.92, opacity: 0, filter: 'grayscale(80%) brightness(0.6)' },
        {
          scale: 1, opacity: 1, filter: 'grayscale(0%) brightness(1.05)',
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

      // Parallax
      gsap.to(imgRef.current, {
        y: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Timeline items cascade
      const items = timelineRef.current?.querySelectorAll('.tl-item');
      gsap.fromTo(items,
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true,
            onEnter: () => {
              // Autoplay timeline steps
              items.forEach((_, i) => {
                setTimeout(() => setActiveStep(i), i * 350);
              });
            }
          }
        }
      );

      // Heading
      gsap.fromTo('.growth-heading .gh-word',
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
        }
      );

      // Gains
      gsap.fromTo('.growth-gain',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.growth-gains', start: 'top 82%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="growth" className="growth" ref={sectionRef}>
      <div className="growth-glow" />
      <div className="growth-container">
        <div className="growth-chapter">
          <span className="chapter-num" style={{ color: 'rgba(139,92,246,0.12)' }}>04</span>
          <span className="chapter-line" />
          <span className="chapter-title">THE ARENA · THE REALIZATION</span>
        </div>

        <div className="growth-grid">
          {/* LEFT: Story + timeline */}
          <div className="growth-text-col">
            <h2 className="growth-heading">
              <span className="gh-word">You held your </span>
              <span className="gh-word growth-accent">ground</span>
              <br />
              <span className="gh-word growth-dim">Who Figured Half Of It Out Midway</span>
            </h2>

            <p className="growth-sub">
              "I didn't win. But I also didn't embarrass myself.{' '}
              <em>That's progress.</em>"
            </p>

            {/* High-pressure build timeline */}
            <div className="growth-timeline" ref={timelineRef}>
              {timeline.map((step, i) => (
                <div
                  key={i}
                  className={`tl-item ${activeStep >= i ? 'active' : ''}`}
                  style={{ '--step-color': step.color }}
                  onClick={() => setActiveStep(activeStep >= i ? i - 1 : i)}
                >
                  <div className="tl-dot" />
                  <div className="tl-time">{step.time}</div>
                  <div className="tl-event">{step.event}</div>
                  <div className="tl-mood">{step.mood}</div>
                </div>
              ))}
            </div>

            <div className="growth-gains">
              <div className="growth-gain-label">WHAT YOU GAINED INSTEAD</div>
              {['awareness', 'perspective', 'clarity — seeing what better looks like IN THE ROOM'].map((g, i) => (
                <div key={i} className="growth-gain">
                  <span className="gg-bullet">→</span>
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image + realization */}
          <div className="growth-visual-col">
            <div className="growth-img-wrap" ref={imgRef}>
              <video
                className="origin-img"
                src={chapter4}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              {/* Trophy overlay */}
              <div className="growth-trophy">
                <span className="gt-num">↑</span>
                <span className="gt-label">LEVEL UP</span>
              </div>
              {/* Glow effect */}
              <div className="growth-img-glow" />
            </div>

            {/* Realization card */}
            <div className="growth-realization">
              <div className="gr-header">
                <span className="gr-icon">💡</span>
                <span className="gr-title">THE REALIZATION</span>
              </div>
              <div className="gr-content">
                <p>You start noticing what consistency actually looks like.</p>
                <p>And something shifted. Not pressure. Not guilt.</p>
                <p className="gr-key">Something quieter. More permanent.</p>
                <p className="gr-word">Purpose.</p>
              </div>
              <div className="gr-footer">
                <span>This isn't about ticking boxes.</span>
                <span>This is about building something real.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
