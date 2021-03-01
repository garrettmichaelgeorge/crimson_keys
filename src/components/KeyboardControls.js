import React from 'react'
import SynthControl from './SynthControl'
import DistortionControl from './DistortionControl'
import ReverbControl from './ReverbControl'

import './KeyboardControls.css'

const KeyboardControls = React.memo(({ synths, distortionWet, reverbOptions, handleChange }) => {
  return (
    <section className='keyboard-controls'>
      <SynthControl synths={synths} handleChange={handleChange} />
      <DistortionControl distortionWet={distortionWet} handleChange={handleChange} />
      <ReverbControl reverbOptions={reverbOptions} handleChange={handleChange} />
    </section>
  )
})

export default KeyboardControls
