import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { keyMidiMappings, getMidiNotesBetween } from "../util";
import { useForceUpdate } from "../hooks";
import {
  Keyboard,
  SynthControls,
  DistortionControls,
  ReverbControls,
  Loading,
} from ".";
import {
  synthConfig,
  distortionConfig,
  reverbConfig,
  feedbackDelayConfig,
} from "../data";

export default function AudioGUI() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [attackLength, setAttackLength] = useState("8n");
  const [rangeMidi] = useState(getMidiNotesBetween(48, 72));

  const forceUpdate = useForceUpdate();

  const synth = useRef();
  const distortion = useRef();
  const reverb = useRef();
  const feedbackDelay = useRef();

  useEffect(function initTone() {
    initEffects();
    initSynth();
    connectSynth(
      synth.current,
      distortion.current,
      reverb.current,
      feedbackDelay.current
    );
    setIsLoaded(true);

    return () => {
      disposeEach(
        synth.current,
        distortion.current,
        reverb.current,
        feedbackDelay.current
      );
    };

    function initEffects() {
      distortion.current = new Tone.Distortion(
        distortionConfig.standard
      ).toDestination();

      reverb.current = new Tone.Reverb(reverbConfig.standard).toDestination();
      feedbackDelay.current = new Tone.FeedbackDelay(
        feedbackDelayConfig.standard
      ).toDestination();
    }

    function initSynth() {
      synth.current = new Tone.Synth(synthConfig.fatsawtooth);
    }

    function connectSynth(synth, ...effects) {
      synth.fan(...effects);
    }

    function disposeSynth(synth) {
      synth.dispose();
    }

    function disposeEach(...audioNodes) {
      audioNodes.forEach(node => node.dispose());
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
    synth.current.triggerAttack(pitch);
  };

  const handleKeyUp = e => {
    if (!isPlayableKey(e.which)) return;

    synth.current.triggerRelease();
  };

  const isPlayableKey = keyWhich => {
    return typeof keyMidiMappings[keyWhich] !== undefined;
  };

  const handleClick = e => {
    if (typeof synth !== "object") return null;

    const pitch = e.target.attributes.value.value;
    synth.current.triggerAttackRelease(pitch, attackLength);
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
      <Keyboard
        rangeMidi={rangeMidi}
        handleClick={handleClick}
        controls={
          <>
            <SynthControls synth={synth.current} handleChange={handleChange} />
            <DistortionControls
              distortion={distortion}
              handleChange={handleChange}
            />
            <ReverbControls reverb={reverb} handleChange={handleChange} />
          </>
        }
      />
    );
  }
}
