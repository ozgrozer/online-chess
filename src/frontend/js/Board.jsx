import React, { useRef, useEffect } from 'react'

import blackBishop from './../img/pieces/blackBishop.png'
import blackKing from './../img/pieces/blackKing.png'
import blackKnight from './../img/pieces/blackKnight.png'
import blackPawn from './../img/pieces/blackPawn.png'
import blackQueen from './../img/pieces/blackQueen.png'
import blackRook from './../img/pieces/blackRook.png'
import whiteBishop from './../img/pieces/whiteBishop.png'
import whiteKing from './../img/pieces/whiteKing.png'
import whiteKnight from './../img/pieces/whiteKnight.png'
import whitePawn from './../img/pieces/whitePawn.png'
import whiteQueen from './../img/pieces/whiteQueen.png'
import whiteRook from './../img/pieces/whiteRook.png'

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

  const size = defaults.square.size
  const pieces = [
    { color: 'black', name: 'rook', position: { x: (size * 0), y: (size * 0) } },
    { color: 'black', name: 'knight', position: { x: (size * 1), y: (size * 0) } },
    { color: 'black', name: 'bishop', position: { x: (size * 2), y: (size * 0) } },
    { color: 'black', name: 'queen', position: { x: (size * 3), y: (size * 0) } },
    { color: 'black', name: 'king', position: { x: (size * 4), y: (size * 0) } },
    { color: 'black', name: 'bishop', position: { x: (size * 5), y: (size * 0) } },
    { color: 'black', name: 'knight', position: { x: (size * 6), y: (size * 0) } },
    { color: 'black', name: 'rook', position: { x: (size * 7), y: (size * 0) } },
    { color: 'black', name: 'pawn', position: { x: (size * 0), y: (size * 1) } },
    { color: 'black', name: 'pawn', position: { x: (size * 1), y: (size * 1) } },
    { color: 'black', name: 'pawn', position: { x: (size * 2), y: (size * 1) } },
    { color: 'black', name: 'pawn', position: { x: (size * 3), y: (size * 1) } },
    { color: 'black', name: 'pawn', position: { x: (size * 4), y: (size * 1) } },
    { color: 'black', name: 'pawn', position: { x: (size * 5), y: (size * 1) } },
    { color: 'black', name: 'pawn', position: { x: (size * 6), y: (size * 1) } },
    { color: 'black', name: 'pawn', position: { x: (size * 7), y: (size * 1) } },

    { color: 'white', name: 'rook', position: { x: (size * 0), y: (size * 7) } },
    { color: 'white', name: 'knight', position: { x: (size * 1), y: (size * 7) } },
    { color: 'white', name: 'bishop', position: { x: (size * 2), y: (size * 7) } },
    { color: 'white', name: 'queen', position: { x: (size * 3), y: (size * 7) } },
    { color: 'white', name: 'king', position: { x: (size * 4), y: (size * 7) } },
    { color: 'white', name: 'bishop', position: { x: (size * 5), y: (size * 7) } },
    { color: 'white', name: 'knight', position: { x: (size * 6), y: (size * 7) } },
    { color: 'white', name: 'rook', position: { x: (size * 7), y: (size * 7) } },
    { color: 'white', name: 'pawn', position: { x: (size * 0), y: (size * 6) } },
    { color: 'white', name: 'pawn', position: { x: (size * 1), y: (size * 6) } },
    { color: 'white', name: 'pawn', position: { x: (size * 2), y: (size * 6) } },
    { color: 'white', name: 'pawn', position: { x: (size * 3), y: (size * 6) } },
    { color: 'white', name: 'pawn', position: { x: (size * 4), y: (size * 6) } },
    { color: 'white', name: 'pawn', position: { x: (size * 5), y: (size * 6) } },
    { color: 'white', name: 'pawn', position: { x: (size * 6), y: (size * 6) } },
    { color: 'white', name: 'pawn', position: { x: (size * 7), y: (size * 6) } }
  ]

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

    const pieceImages = {
      'black-bishop': blackBishop,
      'black-king': blackKing,
      'black-knight': blackKnight,
      'black-pawn': blackPawn,
      'black-queen': blackQueen,
      'black-rook': blackRook,
      'white-bishop': whiteBishop,
      'white-king': whiteKing,
      'white-knight': whiteKnight,
      'white-pawn': whitePawn,
      'white-queen': whiteQueen,
      'white-rook': whiteRook
    }

    for (const key in pieces) {
      const piece = pieces[key]
      const pieceImage = pieceImages[`${piece.color}-${piece.name}`]
      drawImage(pieceImage, img => ctx.drawImage(img, piece.position.x, piece.position.y, size, size))
    }
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
