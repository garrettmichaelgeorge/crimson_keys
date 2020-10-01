import React from 'react'

function KeyboardControls (props) {

  return (
      <div className='keyboard-controls'>
        <select
          name='synthType'
          value={props.value}
          onChange={props.handleChange}
        >
          <option value='Synth'>Basic Synth</option>
          <option value='MembraneSynth'>Membrane Synth</option>
          <option value='AMSynth'>AM Synth</option>
          <option value='FMSynth'>FM Synth</option>
        </select>
      </div>
  )
}

export default KeyboardControls
