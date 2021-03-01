import React, { useState, useEffect, useRef } from 'react'
import Keys from './Keys'
import KeyboardControls from './KeyboardControls'
import getMidiNotesBetween from '../util/getMidiNotesBetween'
import Loading from './Loading'
import * as Tone from 'tone'
import './Keyboard.css'

function Keyboard (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [rangeMIDI] = useState(getMidiNotesBetween(48, 72))
  const [distortionWet, setDistortionWet] = useState(0)
  const [reverbOptions, setReverbOptions] = useState({decay: 5, predelay: 1, wet: 1})

  const [currentSynth, setCurrentSynth] = useState('')

  // Instruments
  const activeSynth = useRef()
  const synth = useRef()
  const membraneSynth = useRef()
  const amSynth = useRef()
  const fmSynth = useRef()

  // Audio Effects
  const distortion = useRef()
  const reverb = useRef()

  useEffect(() => {
    // Set up effects
    distortion.current = new Tone.Distortion(0).toDestination()
    reverb.current = new Tone.Reverb().toDestination()
    // Set up instruments
    synth.current = new Tone.Synth()
    membraneSynth.current = new Tone.MembraneSynth().toDestination()
    amSynth.current = new Tone.AMSynth().toDestination()
    fmSynth.current = new Tone.FMSynth().toDestination()

    // Select Basic Synth as default instrument
    activeSynth.current = synth.current

    // Connect instruments to effects in parallel
    const instruments = [synth.current, membraneSynth.current, amSynth.current, fmSynth.current]
    instruments.forEach(instrument => {
      instrument.fan(distortion.current, reverb.current)
    })

    setIsLoaded(true)

    return () => {
      instruments.forEach(audioNode => {
        audioNode.dispose()
      })
    }
  }, [])

  useEffect(() => {
    distortion.current.wet.value = distortionWet
  }, [distortionWet])

  useEffect(() => {
    const { decay, predelay, wet } = reverbOptions

    reverb.current.set({decay, predelay, wet})
  }, [reverbOptions])

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'distortionWet') {
      setDistortionWet(value)
    } else if (name === 'reverbWet' ) {
      setReverbOptions({...reverbOptions, wet: value})
    } else {
      setCurrentSynth(value)
    }
  }

  const selectSynth = synthRef => {
    setCurrentSynth(synthRef)
  }

  const handleClick = e => {
    if (typeof activeSynth !== 'object') return null

    const pitch = e.target.attributes.value.value
    const rhythm = '8n'
    activeSynth.current.triggerAttackRelease(pitch, rhythm)
  }

  if (!isLoaded) {
    return <Loading />
  } else {
    return (
      <section className='keyboard'>
        <KeyboardControls
          synth={synth.current}
          membraneSynth={membraneSynth.current}
          amSynth={amSynth.current}
          fmSynth={fmSynth.current}
          activeSynth={activeSynth}
          handleChange={handleChange}
          distortionWet={distortionWet}
          reverbOptions={reverbOptions}
        />

        <Keys
          rangeMIDI={rangeMIDI}
          handleClick={handleClick}
        />
      </section>
    )
  }
}

export default Keyboard
