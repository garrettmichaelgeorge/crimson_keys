import React from 'react'
import Sound from './Sound'

import Key from './Key'
import notes from './notes'
import createNotes from './createNotes'

import './Keyboard.css'

class Keyboard extends React.Component {
  constructor () {
    super()
    this.state = {
      context: new (window.AudioContext || window.webkitAudioContext)(),
      notes: []
    }

    this.playSound = this.playSound.bind(this)
  }

  componentDidMount () {
    this.setState({ notes: createNotes() })
  }

  playSound(note) {
    const sound = new Sound(this.state.context)
    sound.play(note.frequency)
    sound.stop()
  }

  render () {
    const keyComponents = this.state.notes.map(note => {
      return (
        <Key
          note={note}
          onMouseEnter={() => this.playSound(note)}
        />
      )
    })

    return (
      <div className='keyboard'>
        <div className='keys'>
          {keyComponents}
        </div>
      </div>
    )
  }
}

export default Keyboard
