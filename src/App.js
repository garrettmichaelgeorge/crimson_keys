import React from 'react'
import './App.css'
import Keyboard from './Keyboard'

function App () {
  return (
    <div className='App container'>
      <header className='header'>
        <h1 className='h1'>Keyboard</h1>
        <h6 className='subhead'>Tone.js with React</h6>
      </header>
      <main className='main'>
        <Keyboard />
      </main>
    </div>
  )
}

export default App
