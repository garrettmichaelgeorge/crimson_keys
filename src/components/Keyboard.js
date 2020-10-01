import React, { useState, useEffect, useRef } from 'react'
import Key from './Key'
import KeyboardControls from './KeyboardControls'
import getMidiNotesBetween from '../util/getMidiNotesBetween'
import Loading from './Loading'
import * as Tone from 'tone'
import './Keyboard.css'

function Keyboard (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [rangeMIDI] = useState(getMidiNotesBetween(48, 72))
  const [currentSynth, setCurrentSynth] = useState({})
  const [distortionWet, setDistortionWet] = useState(0)
  const [reverbOptions, setReverbOptions] = useState({decay: 5, predelay: 1, wet: 1})

  // Instruments
  const synth = useRef()
  const membraneSynth = useRef()
  const amSynth = useRef()
  const fmSynth = useRef()

  // Audio Effects
  const distortion = useRef()
  const reverb = useRef()

  useEffect(() => {
    // Set up effects
    distortion.current = new Tone.Distortion(distortionWet).toDestination()
    reverb.current = new Tone.Reverb(reverbOptions).toDestination()
    // Set up instruments
    synth.current = new Tone.Synth()
    membraneSynth.current = new Tone.MembraneSynth().toDestination()
    amSynth.current = new Tone.AMSynth().toDestination()
    fmSynth.current = new Tone.FMSynth().toDestination()

    // Select Basic Synth as default instrument
    setCurrentSynth(synth.current)

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
  }, [distortionWet, reverbOptions])

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
      selectInstrument(value.name)
    }
  }

  const selectInstrument = synthType => {
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
    if (!currentSynth.name) return null

    const pitch = e.target.attributes.value.value
    const rhythm = '8n'
    currentSynth.triggerAttackRelease(pitch, rhythm)
  }

  if (!isLoaded) return <Loading />

    return (
      <section className='keyboard'>

        <KeyboardControls
          currentSynth={currentSynth}
          handleChange={handleChange}
          distortionWet={distortionWet}
          reverbOptions={reverbOptions}
        />

        <div className='keys'>
          {rangeMIDI.map((noteMidi, i) => (
            <Key
              key={noteMidi}
              noteMidi={noteMidi}
              handleClick={handleClick}
            />
          ))}
        </div>
      </section>
    )
}

export default Keyboard
