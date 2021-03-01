import React, { useState, useEffect, useRef } from 'react'
import Keys from './Keys'
import KeyboardControls from './KeyboardControls'
import getMidiNotesBetween from '../util/getMidiNotesBetween'
import Loading from './Loading'
import * as Tone from 'tone'
import './Keyboard.css'

function useForceUpdate() {
  const [value, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

function Keyboard (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [rangeMIDI] = useState(getMidiNotesBetween(48, 72))
  const [distortionOptions, setDistortionOptions] = useState({ wet: 0 })
  const [reverbOptions, setReverbOptions] = useState({ decay: 5, predelay: 1, wet: 1 })

  const [currentSynth, setCurrentSynth] = useState('')

  const forceUpdate = useForceUpdate()

  // Instruments
  const activeSynth = useRef()
  const synth = useRef()
  const membraneSynth = useRef()
  const amSynth = useRef()
  const fmSynth = useRef()

  const synths = {
    activeSynth: activeSynth,
    synth: synth,
    membraneSynth: membraneSynth,
    amSynth: amSynth,
    fmSynth: fmSynth
  }

  // Audio Effects
  const distortion = useRef()
  const reverb = useRef()

  useEffect(() => {
    // Set up effects
    distortion.current = new Tone.Distortion().toDestination()
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

  useEffect(function syncDistortion() {
    console.log('Syncing distortion...', distortionOptions)

    distortion.current.wet.value = distortionOptions.wet
  }, [distortionOptions])

  useEffect(function syncReverb() {
    const { decay, predelay, wet } = reverbOptions

    reverb.current.set({decay, predelay, wet})
  }, [reverbOptions])

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'distortion.wet') {
      distortion.current.wet.set({ value: value })
    } else if (name === 'reverb.wet' ) {
      reverb.current.wet.set({ value: value })
    } else {
      setCurrentSynth(value)
    }

    forceUpdate()
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
          synths={synths}
          distortionOptions={distortionOptions}
          distortion={distortion}
          reverbOptions={reverbOptions}
          reverb={reverb}
          handleChange={handleChange}
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
