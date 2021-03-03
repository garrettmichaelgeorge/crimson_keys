import * as Tone from "tone";

export default function useSynth(type) {
  const synth = new Tone.Synth();

  return synth;
}
