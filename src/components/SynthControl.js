import React from 'react'
import KeyboardControl from './KeyboardControl'

export default function SynthControl({ handleChange, synths }) {
  return (
    <KeyboardControl name='Instrument'>
      <select
        name='activeSynth.name'
        value={synths.activeSynth.current}
        onChange={handleChange}
      >
        <option value=''>Select an instrument</option>
        <option value={synths.synth.current}>Basic Synth</option>
        <option value={synths.membraneSynth.current}>Membrane Synth</option>
        <option value={synths.amSynth.current}>AM Synth</option>
        <option value={synths.fmSynth.current}>FM Synth</option>
      </select>
    </KeyboardControl>
  )
}
