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
    const size = defaults.square.size

    drawImage(bpPng, img => ctx.drawImage(img, (size * 0), (size * 1), size, size))
    drawImage(bpPng, img => ctx.drawImage(img, (size * 1), (size * 1), size, size))
    drawImage(bpPng, img => ctx.drawImage(img, (size * 2), (size * 1), size, size))
    drawImage(bpPng, img => ctx.drawImage(img, (size * 3), (size * 1), size, size))
    drawImage(bpPng, img => ctx.drawImage(img, (size * 4), (size * 1), size, size))
    drawImage(bpPng, img => ctx.drawImage(img, (size * 5), (size * 1), size, size))
    drawImage(bpPng, img => ctx.drawImage(img, (size * 6), (size * 1), size, size))
    drawImage(bpPng, img => ctx.drawImage(img, (size * 7), (size * 1), size, size))
    drawImage(brPng, img => ctx.drawImage(img, (size * 0), (size * 0), size, size))
    drawImage(bnPng, img => ctx.drawImage(img, (size * 1), (size * 0), size, size))
    drawImage(bbPng, img => ctx.drawImage(img, (size * 2), (size * 0), size, size))
    drawImage(bqPng, img => ctx.drawImage(img, (size * 3), (size * 0), size, size))
    drawImage(bkPng, img => ctx.drawImage(img, (size * 4), (size * 0), size, size))
    drawImage(bbPng, img => ctx.drawImage(img, (size * 5), (size * 0), size, size))
    drawImage(bnPng, img => ctx.drawImage(img, (size * 6), (size * 0), size, size))
    drawImage(brPng, img => ctx.drawImage(img, (size * 7), (size * 0), size, size))

    drawImage(wpPng, img => ctx.drawImage(img, (size * 0), (size * 6), size, size))
    drawImage(wpPng, img => ctx.drawImage(img, (size * 1), (size * 6), size, size))
    drawImage(wpPng, img => ctx.drawImage(img, (size * 2), (size * 6), size, size))
    drawImage(wpPng, img => ctx.drawImage(img, (size * 3), (size * 6), size, size))
    drawImage(wpPng, img => ctx.drawImage(img, (size * 4), (size * 6), size, size))
    drawImage(wpPng, img => ctx.drawImage(img, (size * 5), (size * 6), size, size))
    drawImage(wpPng, img => ctx.drawImage(img, (size * 6), (size * 6), size, size))
    drawImage(wpPng, img => ctx.drawImage(img, (size * 7), (size * 6), size, size))
    drawImage(wrPng, img => ctx.drawImage(img, (size * 0), (size * 7), size, size))
    drawImage(wnPng, img => ctx.drawImage(img, (size * 1), (size * 7), size, size))
    drawImage(wbPng, img => ctx.drawImage(img, (size * 2), (size * 7), size, size))
    drawImage(wqPng, img => ctx.drawImage(img, (size * 3), (size * 7), size, size))
    drawImage(wkPng, img => ctx.drawImage(img, (size * 4), (size * 7), size, size))
    drawImage(wbPng, img => ctx.drawImage(img, (size * 5), (size * 7), size, size))
    drawImage(wnPng, img => ctx.drawImage(img, (size * 6), (size * 7), size, size))
    drawImage(wrPng, img => ctx.drawImage(img, (size * 7), (size * 7), size, size))
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
