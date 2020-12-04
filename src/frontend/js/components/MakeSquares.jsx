import React from 'react'

const MakeSquares = props => {
  const { defaults } = props

  const squares = []

  for (let y = 0; y < defaults.board.rows; y++) {
    for (let x = 0; x < defaults.board.cols; x++) {
      let color = ''

      // x0y0, x2y0, x0y2, x2y2
      if (x % 2 === 0 && y % 2 === 0) {
        color = defaults.square.colors.first
      // x1y0, x3y0, x1y2, x3y2
      } else if (x % 2 === 1 && y % 2 === 0) {
        color = defaults.square.colors.second
      // x0y1, x2y1, x0y3, x2y3
      } else if (x % 2 === 0 && y % 2 === 1) {
        color = defaults.square.colors.second
      // x1y1, x3y1, x1y3, x3y3
      } else if (x % 2 === 1 && y % 2 === 1) {
        color = defaults.square.colors.first
      }

      squares.push({
        color,
        x: defaults.square.size * x,
        y: defaults.square.size * y
      })
    }
  }

  return (
    <div className='squares'>
      {squares.map((square, key) => {
        const style = {
          top: `${square.y}px`,
          left: `${square.x}px`,
          width: defaults.square.size,
          height: defaults.square.size,
          backgroundColor: square.color
        }

        return <div key={key} style={style} className='square' />
      })}
    </div>
  )
}

export default MakeSquares
