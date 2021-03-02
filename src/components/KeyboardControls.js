import React from "react";
import SynthControls from "./SynthControls";
import DistortionControls from "./DistortionControls";
import ReverbControls from "./ReverbControls";

import "./KeyboardControls.css";

const KeyboardControls = React.memo(
  ({ synth, distortion, reverb, handleChange }) => {
    return (
      <section className="keyboard-controls">
        <SynthControls synth={synth} handleChange={handleChange} />
        <DistortionControls
          distortion={distortion}
          handleChange={handleChange}
        />
        <ReverbControls reverb={reverb} handleChange={handleChange} />
      </section>
    );
  }
);

export default KeyboardControls;
