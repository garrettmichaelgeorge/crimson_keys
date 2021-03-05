import React from "react";
import { KeyboardControls, Keys, Key } from ".";

import "../styles/Keyboard.css";

const Keyboard = React.memo(({ controls, handleClick, rangeMidi }) => {
  const keys = () => {
    return rangeMidi.map((noteMidi, _i) => key(noteMidi));
  };

  const key = noteMidi => {
    return <Key key={noteMidi} noteMidi={noteMidi} handleClick={handleClick} />;
  };

  return (
    <section className="keyboard">
      <KeyboardControls>{controls}</KeyboardControls>
      <Keys>{keys()}</Keys>
    </section>
  );
});

export default Keyboard;
