import React from 'react'
import type { FC } from 'react'
import LocalButton from './Button'

const App: FC = () => {
  return (
    <div
      style={{
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        background: 'cyan'
      }}
    >
      <h1>App 2</h1>
      <LocalButton />
    </div>
  )
}

export default App
