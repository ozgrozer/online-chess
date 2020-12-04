/* eslint react/jsx-fragments: 0 */

import React from 'react'
import ReactDOM from 'react-dom'

import './../css/app.scss'
import Board from './components/Board'

const App = () => {
  return (
    <React.Fragment>
      <h2>Online Chess</h2>
      <p>Play chess against an online player</p>
      <Board />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
