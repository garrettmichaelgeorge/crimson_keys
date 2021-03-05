import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { keyMidiMappings, getMidiNotesBetween } from "../util";
import { useForceUpdate, useAudioNode } from "../hooks";
import {
  Keyboard,
  EnvelopeControls,
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
  const [attackLength] = useState("8n");
  const [rangeMidi] = useState(getMidiNotesBetween(48, 72));

  const forceUpdate = useForceUpdate();
  const synth = useAudioNode(new Tone.Synth(synthConfig.fatsawtooth));
  const distortion = useAudioNode(
    new Tone.Distortion(distortionConfig.standard)
  );
  const reverb = useAudioNode(new Tone.Reverb(reverbConfig.standard));
  const feedbackDelay = useAudioNode(
    new Tone.FeedbackDelay(feedbackDelayConfig.standard)
  );

  useEffect(function chainAudioNodes() {
    synth.current.chain(
      distortion.current,
      feedbackDelay.current,
      reverb.current,
      Tone.Destination
    );
    setIsLoaded(true);
  });

  useEffect(
    function addKeyboardListener() {
      function handleKeyDown(e) {
        if (!isPlayableKey(e.which)) return;

        const pitch = Tone.Frequency(keyMidiMappings[e.which], "midi");
        synth.current.triggerAttack(pitch);
      }

      function handleKeyUp(e) {
        if (!isPlayableKey(e.which)) return;

        synth.current.triggerRelease();
      }

      function isPlayableKey(keyWhich) {
        return typeof keyMidiMappings[keyWhich] !== undefined;
      }

      window.addEventListener("keydown", e => handleKeyDown(e));
      window.addEventListener("keyup", e => handleKeyUp(e));

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    },
    [synth]
  );

  const handleClick = useCallback(
    e => {
      if (typeof synth !== "object") return null;

      const pitch = e.target.attributes.value.value;
      synth.current.triggerAttackRelease(pitch, attackLength);
    },
    [synth]
  );

  const handleChange = useCallback(
    e => {
      // HACK
      // TODO: make this dynamic, e.g.
      // const updateAudioEffect = (name, value) => {
      //   const [foo, bar, ...baz] = name.split(".");
      //   Function(`${name}.current.set({${baz}: ${value}})`);
      // };
      // updateAudioEffect(name, value)

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
    },
    [reverb, synth, distortion, forceUpdate]
  );

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <Keyboard
        rangeMidi={rangeMidi}
        handleClick={handleClick}
        controls={
          <>
            <EnvelopeControls synth={synth} handleChange={handleChange} />
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
