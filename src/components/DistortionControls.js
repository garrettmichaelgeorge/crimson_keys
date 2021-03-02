import React from 'react'
import KeyboardControlGroup from './KeyboardControlGroup'
import KeyboardControlSlider from './KeyboardControlSlider'

export default function DistortionControls({ handleChange, distortion }) {
  return (
    <KeyboardControlGroup
      name='Distortion'
    >
      <KeyboardControlSlider
        name='distortion.wet'
        value={distortion.current.wet.value}
        handleChange={handleChange}
        label='Amount'
      />
    </KeyboardControlGroup>
  )
}
