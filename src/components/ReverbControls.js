import React from 'react'
import KeyboardControlGroup from './KeyboardControlGroup'
import KeyboardControlSlider from './KeyboardControlSlider'

export default function ReverbControls({
  handleChange,
  reverbOptions,
  reverb
}) {
  return (
    <KeyboardControlGroup name="Reverb">
      <KeyboardControlSlider
        name='reverb.wet'
        value={reverb.current.wet.value}
        handleChange={handleChange}
        label='Dry/Wet'
      />
      <KeyboardControlSlider
        name='reverb.decay'
        value={reverb.current._decay}
        handleChange={handleChange}
        label='Decay'
        max='10.00'
      />
    </KeyboardControlGroup>
  )
}
