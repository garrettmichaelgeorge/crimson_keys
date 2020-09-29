import React from 'react'

const KeyboardControls = props => {

  return (
    <div className='keyboard-controls'>
      <select id='instrumentSelect' name='instrument'>
        <option value='Synth'>Basic Synth</option>
        <option value='MembraneSynth'>Membrane Synth</option>
      </select>
    </div>
  )
}

export default KeyboardControls
