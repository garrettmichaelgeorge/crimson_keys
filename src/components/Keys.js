import React from 'react'
import Key from './Key'

export default function Keys({ rangeMIDI, handleClick }) {
  const keys = () => {
    return rangeMIDI.map((noteMidi, i) => (
      key(noteMidi)
    ))
  }

  const key = (noteMidi) => {
    return (
        <Key
          key={noteMidi}
          noteMidi={noteMidi}
          handleClick={handleClick}
        />
    )
  }

  return (
    <section id='keys' className='keys'>
      {keys()}
    </section>
  )
}
