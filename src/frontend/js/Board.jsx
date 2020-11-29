import React, { useRef, useEffect } from 'react'

const Board = () => {
  const boardRef = useRef(null)

  const draw = props => {
    const { canvas, ctx } = props

    const defaults = {
      cols: 8,
      rows: 8,
      squareSize: 50,
      squareColors: {
        first: '#f0d9b5',
        second: '#b58863'
      }
    }

    // canvas background
    canvas.width = defaults.squareSize * defaults.cols
    canvas.height = defaults.squareSize * defaults.rows
    ctx.fillStyle = '#ddd'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // squares
    for (let y = 0; y < defaults.rows; y++) {
      for (let x = 0; x < defaults.cols; x++) {
        // x0y0, x2y0, x0y2, x2y2
        if (x % 2 === 0 && y % 2 === 0) {
          ctx.fillStyle = defaults.squareColors.first
        // x1y0, x3y0, x1y2, x3y2
        } else if (x % 2 === 1 && y % 2 === 0) {
          ctx.fillStyle = defaults.squareColors.second
        // x0y1, x2y1, x0y3, x2y3
        } else if (x % 2 === 0 && y % 2 === 1) {
          ctx.fillStyle = defaults.squareColors.second
        // x1y1, x3y1, x1y3, x3y3
        } else if (x % 2 === 1 && y % 2 === 1) {
          ctx.fillStyle = defaults.squareColors.first
        }

        const xPosition = defaults.squareSize * x
        const yPosition = defaults.squareSize * y
        ctx.fillRect(xPosition, yPosition, defaults.squareSize, defaults.squareSize)
      }
    }
  }

  useEffect(() => {
    const canvas = boardRef.current
    const ctx = canvas.getContext('2d')
    draw({ canvas, ctx })
  }, [])

  return <canvas id='board' ref={boardRef} />
}

export default Board
