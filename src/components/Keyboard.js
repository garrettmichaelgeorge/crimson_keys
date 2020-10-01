import React, { useState, useEffect, useRef } from 'react'
import Key from './Key'
import KeyboardControls from './KeyboardControls'
import getMidiNotesBetween from '../util/getMidiNotesBetween'
import Loading from './Loading'
import { synthTypes } from './synthTypes'
import * as Tone from 'tone'
import './Keyboard.css'

function Keyboard (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [rangeMIDI] = useState(getMidiNotesBetween(48, 88))
  const [currentSynth, setCurrentSynth] = useState({})

  const synth = useRef()
  const membraneSynth = useRef()
  const amSynth = useRef()
  const fmSynth = useRef()

  useEffect(() => {
    synth.current = new Tone.Synth().toMaster()
    membraneSynth.current = new Tone.MembraneSynth().toMaster()
    amSynth.current = new Tone.AMSynth().toMaster()
    fmSynth.current = new Tone.FMSynth().toMaster()
    setCurrentSynth(synth.current)
    setIsLoaded(true)
  }, [])

  const handleChange = e => {
    const synthType = e.target.value
    console.log(synthType)
    switch (synthType) {
      case 'Synth':
        setCurrentSynth(synth.current)
        break
      case 'MembraneSynth':
        setCurrentSynth(membraneSynth.current)
        break
      case 'AMSynth':
        setCurrentSynth(amSynth.current)
        break
      case 'FMSynth':
        setCurrentSynth(fmSynth.current)
        break
      default:
        return
    }
  }

  const handleClick = e => {
    const pitch = e.target.attributes.value.value
    const rhythm = '8n'
    currentSynth.triggerAttackRelease(pitch, rhythm)
  }

  if (!isLoaded) return <Loading />

  return (
    <section className='keyboard'>
      <KeyboardControls value={currentSynth.name || ''} handleChange={handleChange} />
      <div className='keys'>
        {rangeMIDI.map((noteMidi, i) => (
          <Key
            key={i}
            noteMidi={noteMidi}
            handleClick={handleClick}
          />
        ))}
      </div>
    </section>
  )
}

export default Keyboard
