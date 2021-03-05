import React from "react";

const KeyboardControlGroup = React.memo(({ name, children }) => {
  return (
    <fieldset id="KeyboardControlGroup{name}" className="keyboard-control">
      <legend>{name}</legend>
      {children}
    </fieldset>
  );
});

export default KeyboardControlGroup;
