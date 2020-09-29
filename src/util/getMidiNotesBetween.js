import rangeFrom from './rangeFrom'
import * as Tone from 'tone'

const getMidiNotesBetween = (start, end) => {
  const midiNotes = [...rangeFrom(start, end)]
  const result = midiNotes.map(midiNote => {
    return Tone.Frequency(midiNote, 'midi')
  })
  return result
}

export default getMidiNotesBetween
