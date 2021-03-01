import React from 'react'
import KeyboardControl from './KeyboardControl'

export default function DistortionControl({ handleChange, distortionWet }) {
  return (
    <KeyboardControl name='Distortion'>
      <label>
        <input
          type='range'
          name='distortionWet'
          value={distortionWet}
          min='0'
          max='1.00'
          step='0.01'
          onChange={handleChange}
        />
        Amount
      </label>
    </KeyboardControl>
  )
}
