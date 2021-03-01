import React from 'react'
import KeyboardControl from './KeyboardControl'

export default function DistortionControl({ handleChange, reverbOptions }) {
  return (
    <KeyboardControl
      name="Reverb"
    >
      <label>
        <input
          type='range'
          name='reverbWet'
          value={reverbOptions.wet}
          min='0'
          max='1.00'
          step='0.01'
          onChange={handleChange}
        />
        Dry/Wet
      </label>
    </KeyboardControl>
  )
}