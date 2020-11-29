import React from 'react'
import ReactDOM from 'react-dom'

import './../css/app.scss'
import Board from './Board'

const App = () => {
  return (
    <div id='app'>
      <h2>Online Chess</h2>
      <p>Play chess against an online player</p>
      <Board />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
