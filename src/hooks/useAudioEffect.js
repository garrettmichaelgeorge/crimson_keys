import { useEffect, useRef } from "react";

export default function useAudioEffect(anAudioEffect, callback) {
  const audioEffect = useRef();

  useEffect(() => {
    audioEffect.current = anAudioEffect;
    if (callback) callback();

    return () => {
      audioEffect.current.dispose();
    };
  }, [anAudioEffect]);

  return audioEffect;
}
