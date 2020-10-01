import * as Tone from 'tone'

function useSynth() {
  const synth = new Tone.Synth()

  synth.toMaster()
  
  return synth
}

export default useSynth
