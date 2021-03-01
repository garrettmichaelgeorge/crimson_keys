import React from 'react'
import KeyboardControl from './KeyboardControl'

import './KeyboardControls.css'

const KeyboardControls = React.memo((props) => {
  return (
    <div className='keyboard-controls'>
      <KeyboardControl name='Instrument'>
        <select
          name='activeSynth.name'
          value={props.activeSynth}
          onChange={props.handleChange}
        >
          <option value=''>Select an instrument</option>
          <option value={props.synth}>Basic Synth</option>
          <option value={props.membraneSynth}>Membrane Synth</option>
          <option value={props.amSynth}>AM Synth</option>
          <option value={props.fmSynth}>FM Synth</option>
        </select>
      </KeyboardControl>

      <KeyboardControl name='Distortion'>
        <label>
          <input
            type='range'
            name='distortionWet'
            value={props.distortionWet}
            min='0'
            max='1.00'
            step='0.01'
            onChange={props.handleChange}
          />
          Amount
        </label>
      </KeyboardControl>

      <KeyboardControl name="Reverb">
        <label>
          <input
            type='range'
            name='reverbWet'
            value={props.reverbOptions.wet}
            min='0'
            max='1.00'
            step='0.01'
            onChange={props.handleChange}
          />
          Dry/Wet
        </label>
      </KeyboardControl>
    </div>
  )
})

export default KeyboardControls
