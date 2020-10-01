import React from 'react'

import './Key.css'

function Key (props) {
  const className = () => {
    let result = 'key'
    if (isBlackKey()) result += ' black-key'
    return result
  }

  const isBlackKey = () => {
    return props.noteMidi.toNote().includes('#')
  }

  return (
    <button
      className={className()}
      value={props.noteMidi.toNote()}
      onClick={props.handleClick}
    >
    </button>
  )
}

export default Key
