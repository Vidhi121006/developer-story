import { createContext, useContext, useRef, useState, useEffect } from "react";

import originEn   from "../assets/audio/origin.m4a";
import originHi   from "../assets/audio/origin-hi.m4a";
import strugEn    from "../assets/audio/strug.m4a";
import strugHi    from "../assets/audio/strug-hi.m4a";
import deadliEn   from "../assets/audio/deadli.m4a";
import deadliHi   from "../assets/audio/deadlines-hi.m4a";
import growEn     from "../assets/audio/grow.m4a";
import growHi     from "../assets/audio/growth-hi.m4a";
import finEn      from "../assets/audio/fin.m4a";
import finHi      from "../assets/audio/final-hi.m4a";
import prologueEn from "../assets/audio/pro.m4a";
import prologueHi from "../assets/audio/prologue-hi.m4a";

const AudioCtx = createContext();

export function AudioProvider({ children }) {
  const audioRef           = useRef(null);
  const currentChapterRef  = useRef(null);
  const [language, setLanguage] = useState("en");
  const [narrationOn, setNarrationOn] = useState(true);
  const audioMapRef = useRef({
    prologue: { en: new Audio(prologueEn), hi: new Audio(prologueHi) },
    origin:   { en: new Audio(originEn),   hi: new Audio(originHi)   },
    struggle: { en: new Audio(strugEn),    hi: new Audio(strugHi)    },
    deadline: { en: new Audio(deadliEn),   hi: new Audio(deadliHi)   },
    growth:   { en: new Audio(growEn),     hi: new Audio(growHi)     },
    final:    { en: new Audio(finEn),      hi: new Audio(finHi)      },
  });

  useEffect(() => {
  const map = audioMapRef.current;
  Object.keys(map).forEach(chapter => {
    Object.keys(map[chapter]).forEach(lang => {
      const audio = map[chapter][lang];
      audio.preload = "auto";
      audio.load();
    });
  });
}, []);
  const fadeOut = (audio) => {

  if (!audio) return;

  let vol = audio.volume;

  const fade = setInterval(() => {

    vol -= 0.05;

    if (vol <= 0) {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(fade);
    } else {
      audio.volume = vol;
    }

  }, 40);

};

const playChapter = (chapter) => {

  if (!narrationOn) return; 

  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  const audio = audioMapRef.current[chapter][language];

  audio.currentTime = 0;
  audio.volume = 0.9;
  audio.play().catch(()=>{});

  audioRef.current = audio;
  currentChapterRef.current = chapter;
};

  const stopAudio = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;
    currentChapterRef.current = null;
  }
};

const toggleNarration = () => {
  setNarrationOn(prev => {
    const next = !prev;
    if (!next) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = null;
      currentChapterRef.current = null; 
    }
    return next;
  });
};

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    if (!currentChapterRef.current) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = audioMapRef.current[currentChapterRef.current][language];
    audio.currentTime = 0;
    audio.volume = 0.9;
    audio.play().catch(() => {});
    audioRef.current = audio;
  }, [language]);

  return (
    <AudioCtx.Provider value={{ language, switchLanguage, playChapter, stopAudio, narrationOn, toggleNarration }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}