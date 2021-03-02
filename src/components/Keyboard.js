import React, { useState, useEffect, useRef } from "react";
import Keys from "./Keys";
import KeyboardControls from "./KeyboardControls";
import getMidiNotesBetween from "../util/getMidiNotesBetween";
import Loading from "./Loading";
import useForceUpdate from "../hooks/useForceUpdate";
import * as Tone from "tone";
import "./Keyboard.css";

import { keyMidiMappings } from "../util";

export default function Keyboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rangeMIDI] = useState(getMidiNotesBetween(48, 72));
  const [attackLength, setAttackLength] = useState("8n");

  const forceUpdate = useForceUpdate();

  // Instruments
  const activeSynth = useRef();
  const synth = useRef();
  const membraneSynth = useRef();
  const amSynth = useRef();
  const fmSynth = useRef();

  const synths = {
    activeSynth: activeSynth,
    synth: synth,
    membraneSynth: membraneSynth,
    amSynth: amSynth,
    fmSynth: fmSynth,
  };

  // Audio Effects
  const distortion = useRef();
  const reverb = useRef();

  useEffect(function initTone() {
    const instruments = [synth, membraneSynth, amSynth, fmSynth];

    initEffects();
    initInstruments();
    connectInstruments(instruments);
    setIsLoaded(true);

    return () => {
      disposeInstruments(instruments);
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
      synth.current = new Tone.Synth({
        oscillator: {
          type: "fatsine",
          count: 3,
          spread: 30,
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0.5,
          release: 0.1,
          attackCurve: "exponential",
        },
      });
      membraneSynth.current = new Tone.MembraneSynth().toDestination();
      amSynth.current = new Tone.AMSynth().toDestination();
      fmSynth.current = new Tone.FMSynth().toDestination();

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
  }, []);

  useEffect(function addKeyboardListener() {
    window.addEventListener("keydown", e => handleKeyDown(e));
    window.addEventListener("keyup", e => handleKeyUp(e));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyDown = e => {
    if (!isPlayableKey(e.which)) return;

    const pitch = Tone.Frequency(keyMidiMappings[e.which], "midi");
    activeSynth.current.triggerAttack(pitch);
  };

  const handleKeyUp = e => {
    if (!isPlayableKey(e.which)) return;

    activeSynth.current.triggerRelease();
  };

  const isPlayableKey = keyWhich => {
    return typeof keyMidiMappings[keyWhich] !== undefined;
  };

  const handleClick = e => {
    if (typeof activeSynth !== "object") return null;

    const pitch = e.target.attributes.value.value;
    activeSynth.current.triggerAttackRelease(pitch, attackLength);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "distortion.wet") {
      distortion.current.wet.set({ value: Number(value) });
    } else if (name === "reverb.wet") {
      reverb.current.wet.set({ value: Number(value) });
    } else if (name === "reverb.decay") {
      reverb.current.set({ decay: Number(value) });
    } else if (name === "reverb.preDelay") {
      reverb.current.set({ preDelay: Number(value) });
    } else if (name === "synth.envelope.attack") {
      synth.current.envelope.set({ attack: Number(value) });
    } else if (name === "synth.envelope.sustain") {
      synth.current.envelope.set({ sustain: Number(value) });
    } else if (name === "synth.envelope.decay") {
      synth.current.envelope.set({ decay: Number(value) });
    } else if (name === "synth.envelope.release") {
      synth.current.envelope.set({ release: Number(value) });
    }

    forceUpdate();
  };

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <section className="keyboard">
        <KeyboardControls
          synth={synth.current}
          distortion={distortion}
          reverb={reverb}
          handleChange={handleChange}
        />
        <Keys rangeMIDI={rangeMIDI} handleClick={handleClick} />
      </section>
    );
  }
}
