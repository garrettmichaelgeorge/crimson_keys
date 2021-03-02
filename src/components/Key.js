import React from 'react'

import './Key.css'

function Key ({
  noteMidi,
  handleClick,
  handleKeyDown
}) {
  const className = () => {
    let result = 'key'
    if (isBlackKey()) result += ' black-key'
    return result
  }

  const isBlackKey = () => {
    return noteMidi.toNote().includes('#')
  }

  const noteFrequency = () => {
    return noteMidi.toNote()
  }

  return (
    <button
      className={className()}
      value={noteFrequency()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
    </button>
  )
}

export default Key
