import { useEffect } from "react";
import { useAudio } from "../context/AudioContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useChapterNarration(ref, chapter) {

  const { playChapter, language, narrationOn } = useAudio();

  useEffect(()=>{

    if (!ref.current) return;
    ScrollTrigger.getAll().forEach(t=>{
     if(t.trigger === ref.current) t.kill()
  });
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {if(narrationOn) playChapter(chapter);},
      onEnterBack: () => {if(narrationOn) playChapter(chapter);}
    });
    return ()=> trigger.kill();
  }, [chapter, language, narrationOn]); 
}