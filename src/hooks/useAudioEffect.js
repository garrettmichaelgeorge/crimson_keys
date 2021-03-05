import { useEffect, useRef } from "react";

export default function useAudioEffect(anAudioEffect, callback) {
  const audioEffect = useRef();

  useEffect(() => {
    console.log("Using audio effect!");

    audioEffect.current = anAudioEffect;
    if (callback) callback();

    return () => {
      audioEffect.current.dispose();
    };
  }, []);

  return audioEffect;
}
