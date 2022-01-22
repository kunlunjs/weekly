import type { FC } from 'react'
import React from 'react'
import { lazy, Suspense } from 'react'

// const RemoteApp = lazy(() => import('app2/App'))
const RemoteButton = lazy(() => import('app2/Button'))

const App: FC = () => {
  return (
    <div>
      <div
        style={{
          margin: '10px',
          padding: '10px',
          textAlign: 'center',
          background: 'greenyellow'
        }}
      >
        <h1>App 1</h1>
      </div>
      <Suspense fallback={<p>Lazy loading component...</p>}>
        {/* <RemoteApp /> */}
        <RemoteButton />
      </Suspense>
    </div>
  )
}

export default App
