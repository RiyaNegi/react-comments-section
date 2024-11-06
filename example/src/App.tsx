import React from 'react'
import DefaultComponent from './components/DefaultComponent'

const App = () => {
  return (
    <div className='example-div'>
      <div className='head-title'>Demo Examples</div>
      <hr style={{ borderTop: '1px solid', width: '100%' }} />
      <div className='example-row'>
        <DefaultComponent />
      </div>
    </div>
  )
}

export default App
