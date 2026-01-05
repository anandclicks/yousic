import { createContext, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

export const MusicContext = createContext(null);

export default function MusicContextProvider({ children }) {
  const soundRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);

  const formatTime = (millis = 0) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (!playingSong?.url) return;

    const load = async () => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: playingSong.url },
        { shouldPlay: true },
        (s) => setStatus(s)
      );

      soundRef.current = sound;
    };

    load();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [playingSong]);

  const playPause = async () => {
    if (!soundRef.current) return;

    if (status?.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const forward = async () => {
    if (!soundRef.current || !status) return;
    await soundRef.current.setPositionAsync(status.positionMillis + 10000);
  };

  const backward = async () => {
    if (!soundRef.current || !status) return;
    await soundRef.current.setPositionAsync(
      Math.max(status.positionMillis - 10000, 0)
    );
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        playingSong,
        setPlayingSong,
        playPause,
        forward,
        backward,
        formatTime,
        status,
        soundRef
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
