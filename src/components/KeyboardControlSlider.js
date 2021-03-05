import React from "react";

export default function KeyboardControlSlider({
  handleChange,
  value,
  name,
  label,
  min,
  max,
  step,
}) {
  return (
    <label className="keyboard-control keyboard-control-slider">
      <input
        type="range"
        name={name}
        value={value}
        min={min ? min : "0"}
        max={max ? max : "1.00"}
        step={step ? step : "0.01"}
        onChange={handleChange}
      />
      {label}
    </label>
  );
}
