import * as Tone from "tone";
import { wavySynth } from "../data";

export default function initTone() {
  initEffects();
  initInstruments();
  connectInstrument(synth);
  setIsLoaded(true);

  return () => {
    disposeInstrument(synth);
  };

  function initEffects() {
    distortion.current = new Tone.Distortion({
      distortion: 1,
      oversample: "2x",
      wet: 0.0,
    }).toDestination();

    reverb.current = new Tone.Reverb({
      decay: 5,
      predelay: 1,
      wet: 1,
    }).toDestination();
  }

  function initInstruments() {
    synth.current = wavySynth;

    instrumentDefault();
  }

  function instrumentDefault() {
    activeSynth.current = synth.current;
  }

  function connectInstruments(instruments) {
    instruments.forEach(instrument => connectInstrument(instrument));
  }

  function connectInstrument(instrument) {
    instrument.current.fan(distortion.current, reverb.current);
  }

  function disposeInstruments(instruments) {
    instruments.forEach(instrument => disposeInstrument(instrument));
  }

  function disposeInstrument(instrument) {
    instrument.current.dispose();
  }
}
