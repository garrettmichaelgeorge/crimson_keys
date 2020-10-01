import React from 'react'
import Header from './components/Header'
import Keyboard from './components/Keyboard'

import './App.css'

function App () {
  return (
    <div className='App container'>
      <Header title='Crimson Keyboard' />
      <main className='main'>
        <Keyboard />
      </main>
    </div>
  )
}

export default App
