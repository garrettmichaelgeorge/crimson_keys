import * as Tone from "tone";

export default function useSynth() {
  const synth = new Tone.Synth();

  synth.toMaster();

  return synth;
}
