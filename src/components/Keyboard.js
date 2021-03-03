import React, { useState, useEffect, useRef } from "react";
import { getMidiNotesBetween } from "../util";
import { KeyboardControls, Keys, Key } from ".";
import {
  synthConfig,
  distortionConfig,
  reverbConfig,
  feedbackDelayConfig,
} from "../data";

import "../styles/Keyboard.css";

export default function Keyboard({ controls, handleClick }) {
  const [rangeMIDI] = useState(getMidiNotesBetween(48, 72));
  const keys = () => {
    return rangeMIDI.map((noteMidi, _i) => key(noteMidi));
  };

  const key = noteMidi => {
    return <Key key={noteMidi} noteMidi={noteMidi} handleClick={handleClick} />;
  };

  return (
    <section className="keyboard">
      <KeyboardControls>{controls}</KeyboardControls>

      <Keys rangeMIDI={rangeMIDI} handleClick={handleClick}>
        {keys()}
      </Keys>
    </section>
  );
}
