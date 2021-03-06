import { useEffect, useRef } from "react";

export default function useSynth(aSynth, callback = null) {
  const synth = useRef();

  useEffect(() => {
    console.log("Using synth!");
    synth.current = aSynth;
    if (callback) callback();

    return () => {
      synth.current.dispose();
    };
  });

  return synth;
}
