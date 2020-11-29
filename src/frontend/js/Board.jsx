import React, { useRef, useEffect } from 'react'

import bbPng from './../img/pieces/bb.png'
import bkPng from './../img/pieces/bk.png'
import bnPng from './../img/pieces/bn.png'
import bpPng from './../img/pieces/bp.png'
import bqPng from './../img/pieces/bq.png'
import brPng from './../img/pieces/br.png'
import wbPng from './../img/pieces/wb.png'
import wkPng from './../img/pieces/wk.png'
import wnPng from './../img/pieces/wn.png'
import wpPng from './../img/pieces/wp.png'
import wqPng from './../img/pieces/wq.png'
import wrPng from './../img/pieces/wr.png'

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

  const drawImage = (url, callback) => {
    const image = new window.Image()
    image.src = url
    image.onload = () => callback(image)
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

  const placePieces = props => {
    const { ctx } = props

    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 0), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 1), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 2), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 3), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 4), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 5), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 6), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(bpPng, image => ctx.drawImage(image, (defaults.square.size * 7), (defaults.square.size * 1), defaults.square.size, defaults.square.size))
    drawImage(brPng, image => ctx.drawImage(image, (defaults.square.size * 0), (defaults.square.size * 0), defaults.square.size, defaults.square.size))
    drawImage(bnPng, image => ctx.drawImage(image, (defaults.square.size * 1), (defaults.square.size * 0), defaults.square.size, defaults.square.size))
    drawImage(bbPng, image => ctx.drawImage(image, (defaults.square.size * 2), (defaults.square.size * 0), defaults.square.size, defaults.square.size))
    drawImage(bqPng, image => ctx.drawImage(image, (defaults.square.size * 3), (defaults.square.size * 0), defaults.square.size, defaults.square.size))
    drawImage(bkPng, image => ctx.drawImage(image, (defaults.square.size * 4), (defaults.square.size * 0), defaults.square.size, defaults.square.size))
    drawImage(bbPng, image => ctx.drawImage(image, (defaults.square.size * 5), (defaults.square.size * 0), defaults.square.size, defaults.square.size))
    drawImage(bnPng, image => ctx.drawImage(image, (defaults.square.size * 6), (defaults.square.size * 0), defaults.square.size, defaults.square.size))
    drawImage(brPng, image => ctx.drawImage(image, (defaults.square.size * 7), (defaults.square.size * 0), defaults.square.size, defaults.square.size))

    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 0), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 1), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 2), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 3), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 4), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 5), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 6), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wpPng, image => ctx.drawImage(image, (defaults.square.size * 7), (defaults.square.size * 6), defaults.square.size, defaults.square.size))
    drawImage(wrPng, image => ctx.drawImage(image, (defaults.square.size * 0), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
    drawImage(wnPng, image => ctx.drawImage(image, (defaults.square.size * 1), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
    drawImage(wbPng, image => ctx.drawImage(image, (defaults.square.size * 2), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
    drawImage(wqPng, image => ctx.drawImage(image, (defaults.square.size * 3), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
    drawImage(wkPng, image => ctx.drawImage(image, (defaults.square.size * 4), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
    drawImage(wbPng, image => ctx.drawImage(image, (defaults.square.size * 5), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
    drawImage(wnPng, image => ctx.drawImage(image, (defaults.square.size * 6), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
    drawImage(wrPng, image => ctx.drawImage(image, (defaults.square.size * 7), (defaults.square.size * 7), defaults.square.size, defaults.square.size))
  }

  const draw = props => {
    makeBackgronud(props)
    makeSquares(props)
    placePieces(props)
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
