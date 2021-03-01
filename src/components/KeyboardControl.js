import React from 'react'

export default function KeyboardControl({ name, children }) {
  return (
    <fieldset
      id="KeyboardControl{name}"
      className="keyboard-control"
    >
      <legend>{name}</legend>
      {children}
    </fieldset>
  )
}
