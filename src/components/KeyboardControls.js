import React from 'react'
import SynthControl from './SynthControl'
import DistortionControl from './DistortionControl'
import ReverbControl from './ReverbControl'

import './KeyboardControls.css'

const KeyboardControls = React.memo(({ synths, distortion,  reverb, handleChange }) => {
  return (
    <section className='keyboard-controls'>
      <SynthControl synths={synths} handleChange={handleChange} />
      <DistortionControl distortion={distortion} handleChange={handleChange} />
      <ReverbControl reverb={reverb} handleChange={handleChange} />
    </section>
  )
})

export default KeyboardControls
