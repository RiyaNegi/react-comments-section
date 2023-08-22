import React from 'react'
import AdvancedComponent from './components/AdvancedComponent'
// import ClassComponent from './components/ClassComponent'
// import CustomComponent from './components/CustomComponent'
// import DefaultComponent from './components/DefaultComponent'
// import LogInComponent from './components/LogInComponent'

const App = () => {
  return (
    <div className='example-div'>
      <div className='head-title'>Demo Examples</div>
      <hr style={{ borderTop: '1px solid', width: '100%' }} />
      {/* <div className='example-row'>
        <DefaultComponent />
        <ClassComponent />
      </div>
      <div className='example-row'>
        <CustomComponent />
        <LogInComponent />
      </div> */}
      <div className='example-row'>
        <AdvancedComponent />
      </div>
    </div>
  )
}

export default App
