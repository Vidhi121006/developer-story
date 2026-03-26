import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chapter3 from '../assets/images/chapter3.mp4';
import './Deadline.css';
import useChapterNarration from "../hooks/useChapterNarration";

gsap.registerPlugin(ScrollTrigger);

export default function Deadline() {
  const sectionRef = useRef(null);
  const clockRef = useRef(null);
  const imgRef = useRef(null);
  const [time, setTime] = useState('02:47');
  const [commitMsg, setCommitMsg] = useState('');
  const commitMessages = [
    'please work',
    'final_FINAL_v3',
    'idk man just go',
    'fix the thing',
    'ok now for real',
    'last commit i swear',
  ];
  const [commitIdx, setCommitIdx] = useState(0);
  const [pushed, setPushed] = useState(false);
  useChapterNarration(sectionRef, "deadline");

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Clock countdown animation
      gsap.fromTo(clockRef.current,
        { opacity: 0, scale: 1.3 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

      // Parallax on image
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

      // Night-mode tint on image as you scroll into section
      gsap.fromTo(imgRef.current,
        { filter: 'brightness(1) hue-rotate(0deg)', opacity: 0 },
        {
          filter: 'brightness(0.7) hue-rotate(200deg) saturate(0.6)',
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true }
        }
      );

      // Heading words
      gsap.fromTo('.deadline-heading .dh-word',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
        }
      );

      // Tick the clock
      const startMin = 47;
      let m = startMin;
      const clockInterval = setInterval(() => {
        m = (m + 1) % 60;
        setTime(`02:${String(m).padStart(2, '0')}`);
      }, 1000);

      return () => clearInterval(clockInterval);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCommit = () => {
    const msg = commitMessages[commitIdx % commitMessages.length];
    setCommitMsg(msg);
    setCommitIdx(i => i + 1);
    setPushed(false);
    gsap.fromTo('.commit-result', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
  };

  const handlePush = () => {
    setPushed(true);
    gsap.fromTo('.push-result', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out' });
  };

  return (
    <section id="deadline" className="deadline" ref={sectionRef}>
      <div className="deadline-container">
        <div className="deadline-chapter">
          <span className="chapter-num" style={{ color: 'rgba(59,130,246,0.12)' }}>03</span>
          <span className="chapter-line" />
          <span className="chapter-title">THE 2AM RELIGION</span>
        </div>

        <div className="deadline-grid">
          {/* LEFT: Image */}
          <div className="deadline-img-col">
            <div className="deadline-img-wrap" ref={imgRef}>
              <video
                  className="deadline-img"
                  src={chapter3}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
              />
              {/* Clock overlay */}
              <div className="deadline-clock" ref={clockRef}>
                <span className="dc-label">LOCAL TIME</span>
                <span className="dc-time">{time} AM</span>
                <span className="dc-status">⚠ DEPLOY IN 14 MIN</span>
              </div>
              {/* Coffee counter */}
              <div className="deadline-coffee">
                ☕ <span>×3</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Story + interactive terminal */}
          <div className="deadline-text-col">
            <h2 className="deadline-heading">
              {'Deadlines Are Just'.split('  ').map((w, i) => (
                <span key={i} className="dh-word">{w} </span>
              ))}
              <br />
              <span className="dh-word deadline-accent">Fear</span>
              <span className="dh-word"> With A Timer</span>
            </h2>

            <p className="deadline-sub">
              "I don't procrastinate. I wait for the panic to{' '}
              <em>unlock my full potential.</em>"
            </p>

            <div className="deadline-two-modes">
              <div className="mode-card mode-day">
                <div className="mode-label">☀ DAYTIME YOU</div>
                <ul>
                  <li>Calm</li>
                  <li>Confident</li>
                  <li className="mode-strike">Avoiding the task</li>
                </ul>
              </div>
              <div className="mode-vs">VS</div>
              <div className="mode-card mode-night">
                <div className="mode-label">🌙 2AM YOU</div>
                <ul>
                  <li>Focused</li>
                  <li>Fast</li>
                  <li className="mode-em">Slightly unstable</li>
                </ul>
              </div>
            </div>

            {/* Interactive git terminal */}
            <div className="deadline-terminal">
              <div className="dt-header">
                <div className="dt-dots">
                  <span style={{ background: '#ef4444' }} />
                  <span style={{ background: '#f59e0b' }} />
                  <span style={{ background: '#22c55e' }} />
                </div>
                <span className="dt-title">bash — deadline_mode</span>
              </div>
              <div className="dt-body">
                <div className="dt-prompt">
                  <span className="dt-path">~/project</span>
                  <span className="dt-sym">$</span>
                  <span> Try the buttons below 👇</span>
                </div>

                {commitMsg && (
                  <div className="commit-result dt-line">
                    <span className="dt-sym">$</span>
                    <span> git commit -m <span className="dt-str">"{commitMsg}"</span></span>
                    <br/>
                    <span className="dt-ok"> ✓ [main] committed with vibes</span>
                  </div>
                )}

                {pushed && (
                  <div className="push-result dt-line">
                    <span className="dt-sym">$</span>
                    <span className="dt-ok"> git push origin main</span>
                    <br/>
                    <span className="dt-comment"> Completed just before deadline ✓</span>
                  </div>
                )}
              </div>
              <div className="dt-actions">
                <button className="dt-btn dt-btn--commit" onClick={handleCommit}>
                  git commit -m "???"
                </button>
                <button
                  className={`dt-btn dt-btn--push ${!commitMsg ? 'disabled' : ''}`}
                  onClick={handlePush}
                  disabled={!commitMsg}
                >
                  git push
                </button>
              </div>
            </div>

            <p className="deadline-body">
              Finished just before the deadline.{' '}
              <span className="deadline-em">Victorious. Exhausted. Slightly concerned about life choices.</span>
            </p>
            <p className="deadline-body deadline-irony">
              Next day: "I should start earlier next time."
              <span className="deadline-small"> (Won't.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
