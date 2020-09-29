import { useState, useEffect } from 'react'
import * as Tone from 'tone'

function useSynth() {
  const [isLoaded, setLoaded] = useState(false)
  // const [rangeMIDI, setRangeMIDI] = useState(getMidiNotesBetween(60, 72))
  const synth = new Tone.Synth().toMaster()
  
  return synth
}

export default useSynth
