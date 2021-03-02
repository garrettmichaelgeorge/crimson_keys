import React from 'react'

export default function KeyboardControlGroup({ name, children }) {
  return (
    <fieldset
      id="KeyboardControlGroup{name}"
      className="keyboard-control"
    >
      <legend>{name}</legend>
      {children}
    </fieldset>
  )
}
