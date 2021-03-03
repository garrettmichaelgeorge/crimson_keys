import React from "react";

import "../styles/KeyboardControls.css";

const KeyboardControls = React.memo(({ children }) => {
  return <section className="keyboard-controls">{children}</section>;
});

export default KeyboardControls;
