// import { useEffect, useRef } from 'react';

// const GlobalAudio = () => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.volume = 0.5;
//     audio.loop = true; // 🔥 continuous

//     audio.play().catch(() => {
//       const resumeAudio = () => {
//         audio.play();
//         window.removeEventListener('click', resumeAudio);
//       };
//       window.addEventListener('click', resumeAudio);
//     });
//   }, []);

//   return <audio ref={audioRef} src="/download.wav" />;
// };

// export default GlobalAudio;



import { createContext, useContext, useRef, useEffect } from "react";

const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/download.wav");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      audioRef.current.play().catch(() => {
        const resume = () => {
          audioRef.current?.play();
          window.removeEventListener("click", resume);
        };
        window.addEventListener("click", resume);
      });
    }
  }, []);

  const play = () => audioRef.current?.play();

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <AudioContext.Provider value={{ play, pause }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);