import React, { useRef, useEffect } from 'react'

const Board = () => {
  const defaults = {
    board: {
      cols: 8,
      rows: 8
    },
    square: {
      size: 70,
      colors: {
        first: '#f0d9b5',
        second: '#b58863'
      }
    }
  }

  const makeBackgronud = props => {
    const { canvas, ctx } = props

    canvas.width = defaults.square.size * defaults.board.cols
    canvas.height = defaults.square.size * defaults.board.rows
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const makeSquares = props => {
    const { ctx } = props

    for (let y = 0; y < defaults.board.rows; y++) {
      for (let x = 0; x < defaults.board.cols; x++) {
        // x0y0, x2y0, x0y2, x2y2
        if (x % 2 === 0 && y % 2 === 0) {
          ctx.fillStyle = defaults.square.colors.first
        // x1y0, x3y0, x1y2, x3y2
        } else if (x % 2 === 1 && y % 2 === 0) {
          ctx.fillStyle = defaults.square.colors.second
        // x0y1, x2y1, x0y3, x2y3
        } else if (x % 2 === 0 && y % 2 === 1) {
          ctx.fillStyle = defaults.square.colors.second
        // x1y1, x3y1, x1y3, x3y3
        } else if (x % 2 === 1 && y % 2 === 1) {
          ctx.fillStyle = defaults.square.colors.first
        }

        const xPosition = defaults.square.size * x
        const yPosition = defaults.square.size * y
        ctx.fillRect(xPosition, yPosition, defaults.square.size, defaults.square.size)
      }
    }
  }

  const draw = props => {
    makeBackgronud(props)
    makeSquares(props)
  }

  const boardRef = useRef(null)
  useEffect(() => {
    const canvas = boardRef.current
    const ctx = canvas.getContext('2d')
    draw({ canvas, ctx })
  }, [])

  return <canvas id='board' ref={boardRef} />
}

export default Board
