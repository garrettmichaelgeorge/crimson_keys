import React from 'react'
import KeyboardControl from './KeyboardControl'

export default function DistortionControl({ handleChange, reverbOptions, reverb }) {
  return (
    <KeyboardControl
      name="Reverb"
    >
      <label>
        <input
          type='range'
          name='reverb.wet'
          value={reverb.current.wet.value}
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
