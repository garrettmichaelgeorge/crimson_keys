import React from 'react'

import './Key.css'

function Key (props) {
  const className = () => {
    let result = ['key']
    result.push(isBlackKey() && 'black-key')
    return result.join(' ')
  }

  const isBlackKey = () => {
    return props.note.name.includes('#')
  }

  return (
    <div className={className()}>
      <p>{props.note.name}<sub>{props.note.octave}</sub></p>
    </div>
  )
}

export default Key
