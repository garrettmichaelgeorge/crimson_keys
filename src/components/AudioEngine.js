import React, { useState, useEffect, useRef, useReducer } from 'react'
import { mToF } from '../util/converters'
import { reducer, initialState } from '../store/reducer'

export default function AudioEngine (props) {
  const [playingNotes, setPlayingNotes] = useState([])

  const [state, dispatch] = useReducer(reducer, initialState);

  const audioContext = useRef()

  useEffect(() => {
    audioContext.current = new AudioContext()
    return () => audioContext.close()
  }, [])

  useEffect(() => {
    // props.events.forEach(this.processEvent.bind(this))
    if (props.events) {
      props.events.forEach(event => processEvent(event))
    }
    dispatch({
      type: "CLEAR_EVENT_QUEUE"
    })
  }, [props.events])

  function processEvent (event) {
    switch (event.type) {
      case 'NOTE_ON':
        const osc = audioContext.current.createOscillator()
        osc.frequency.value = mToF(event.key)
        osc.start(audioContext.current.currentTime)
        osc.type = 'sawtooth'
        osc.connect(audioContext.current.destination)
        setPlayingNotes(prevNotes => (
          [
            ...prevNotes,
            {
              key: event.key,
              osc: osc
            }
          ]
        ))
        break
      case 'NOTE_OFF':
        setPlayingNotes(prevNotes => (
          prevNotes.filter(note => note.key === event.key)
          .forEach(note => note.osc.stop(audioContext.current.currentTime))
        ))
        break
      default:
        return
    }
  }

  return null
}
