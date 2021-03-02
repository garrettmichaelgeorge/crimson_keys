import React from "react";
import KeyboardControlGroup from "./KeyboardControlGroup";
import KeyboardControlSlider from "./KeyboardControlSlider";

export default function SynthControls({ handleChange, synth }) {
  return (
    <KeyboardControlGroup name="Envelope">
      <KeyboardControlSlider
        name="synth.envelope.attack"
        label="A"
        handleChange={handleChange}
        value={synth.envelope.attack}
        min="0"
        max="2"
      />
      <KeyboardControlSlider
        name="synth.envelope.decay"
        label="D"
        handleChange={handleChange}
        value={synth.envelope.decay}
        min="0"
        max="2"
      />
      <KeyboardControlSlider
        name="synth.envelope.sustain"
        label="S"
        handleChange={handleChange}
        value={synth.envelope.sustain}
        min="0"
        max="1"
      />
      <KeyboardControlSlider
        name="synth.envelope.release"
        label="R"
        handleChange={handleChange}
        value={synth.envelope.release}
        min="0"
        max="5"
      />
    </KeyboardControlGroup>
  );
}
