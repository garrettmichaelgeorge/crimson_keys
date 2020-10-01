import React from 'react'

function Header (props) {
  return (
    <header className='header'>
      <h1 className='h1'>{props.title}</h1>
      <h6 className='subhead'>Tone.js with React</h6>
    </header>
  )
}

export default Header
