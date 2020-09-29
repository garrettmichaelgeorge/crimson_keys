import React, { useState, useEffect, useRef } from 'react'

import Key from './Key'
import KeyboardControls from './KeyboardControls'
import getMidiNotesBetween from './util/getMidiNotesBetween'
import * as Tone from 'tone'

import './Keyboard.css'

const Keyboard = () => {
  const [isLoaded, setLoaded] = useState(false)
  const [rangeMIDI] = useState(getMidiNotesBetween(48, 88))
  const synth = useRef(null)

  useEffect(() => {
    synth.current = new Tone.MembraneSynth().toMaster()
    setLoaded(true)
  }, [])

  const handleClick = (e) => {
    const pitch = e.target.attributes.value.value
    synth.current.triggerAttackRelease(pitch, '8n')
  }

  const keyComponents = (() => {
    return rangeMIDI.map((noteMidi, i) => {
      return (
        <Key
          key={i}
          noteMidi={noteMidi}
          handleClick={handleClick}
        />
      )
    })
  })()

  return (
    <div className='keyboard'>
      <KeyboardControls />
      <div className='keys'>
        {keyComponents}
      </div>
    </div>
  )
}

export default Keyboard
