import React from 'react'
import Key from './Key'

export default function Keys({
  rangeMIDI,
  handleClick,
  handleKeyDown
}) {
  const keys = () => {
    return rangeMIDI.map((noteMidi, _i) => (
      key(noteMidi)
    ))
  }

  const key = (noteMidi) => {
    return (
      <Key
        key={noteMidi}
        noteMidi={noteMidi}
        handleClick={handleClick}
        handleKeyDown={handleKeyDown}
      />
    )
  }

  return (
    <section id='keys' className='keys'>
      {keys()}
    </section>
  )
}
