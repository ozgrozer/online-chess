import React, { useRef, useEffect, useState } from 'react'

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

const defaults = {
  board: {
    cols: 8,
    rows: 8
  },
  square: {
    size: 70,
    colors: {
      first: '#f0d9b5',
      second: '#b58863',
      selected: '#d9c349'
    }
  }
}

const squareSize = defaults.square.size

const pieces = [
  { color: 'black', name: 'rook', selected: false, position: { x: (squareSize * 0), y: (squareSize * 0) } },
  { color: 'black', name: 'knight', selected: false, position: { x: (squareSize * 1), y: (squareSize * 0) } },
  { color: 'black', name: 'bishop', selected: false, position: { x: (squareSize * 2), y: (squareSize * 0) } },
  { color: 'black', name: 'queen', selected: false, position: { x: (squareSize * 3), y: (squareSize * 0) } },
  { color: 'black', name: 'king', selected: false, position: { x: (squareSize * 4), y: (squareSize * 0) } },
  { color: 'black', name: 'bishop', selected: false, position: { x: (squareSize * 5), y: (squareSize * 0) } },
  { color: 'black', name: 'knight', selected: false, position: { x: (squareSize * 6), y: (squareSize * 0) } },
  { color: 'black', name: 'rook', selected: false, position: { x: (squareSize * 7), y: (squareSize * 0) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 0), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 1), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 2), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 3), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 4), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 5), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 6), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', selected: false, position: { x: (squareSize * 7), y: (squareSize * 1) } },

  { color: 'white', name: 'rook', selected: false, position: { x: (squareSize * 0), y: (squareSize * 7) } },
  { color: 'white', name: 'knight', selected: false, position: { x: (squareSize * 1), y: (squareSize * 7) } },
  { color: 'white', name: 'bishop', selected: false, position: { x: (squareSize * 2), y: (squareSize * 7) } },
  { color: 'white', name: 'queen', selected: false, position: { x: (squareSize * 3), y: (squareSize * 7) } },
  { color: 'white', name: 'king', selected: false, position: { x: (squareSize * 4), y: (squareSize * 7) } },
  { color: 'white', name: 'bishop', selected: false, position: { x: (squareSize * 5), y: (squareSize * 7) } },
  { color: 'white', name: 'knight', selected: false, position: { x: (squareSize * 6), y: (squareSize * 7) } },
  { color: 'white', name: 'rook', selected: false, position: { x: (squareSize * 7), y: (squareSize * 7) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 0), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 1), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 2), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 3), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 4), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 5), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 6), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', selected: false, position: { x: (squareSize * 7), y: (squareSize * 6) } }
]

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

const drawImage = props => {
  const { url, callback, firstTime } = props

  const image = new window.Image()
  image.src = url

  if (firstTime) {
    image.onload = () => callback(image)
  } else {
    if (image) {
      callback(image)
    } else {
      image.onload = () => callback(image)
    }
  }
}

const makeBackgronud = props => {
  const { canvas, ctx } = props

  canvas.width = defaults.square.size * defaults.board.cols
  canvas.height = defaults.square.size * defaults.board.rows
  ctx.clearRect(0, 0, canvas.width, canvas.height)
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

      const xPosition = squareSize * x
      const yPosition = squareSize * y
      ctx.fillRect(xPosition, yPosition, squareSize, squareSize)
    }
  }
}

const placePieces = props => {
  const { ctx, firstTime } = props

  for (const key in pieces) {
    const piece = pieces[key]
    const pieceImage = pieceImages[`${piece.color}-${piece.name}`]

    if (piece.selected) {
      ctx.fillStyle = defaults.square.colors.selected
      ctx.fillRect(piece.position.x, piece.position.y, squareSize, squareSize)
    }

    drawImage({
      firstTime,
      url: pieceImage,
      callback: img => {
        ctx.drawImage(img, piece.position.x, piece.position.y, squareSize, squareSize)
      }
    })
  }
}

const draw = props => {
  makeBackgronud(props)
  makeSquares(props)
  placePieces(props)
}

const boardOnClick = props => {
  const { event, setSelectedPiece } = props

  const canvas = event.target
  const ctx = canvas.getContext('2d')
  const firstTime = false

  const boardLeft = canvas.offsetLeft + canvas.clientLeft
  const boardTop = canvas.offsetTop + canvas.clientTop
  const xPosition = event.pageX - boardLeft
  const yPosition = event.pageY - boardTop

  for (const key in pieces) {
    const piece = pieces[key]

    if (
      yPosition > piece.position.y && yPosition < (piece.position.y + squareSize) &&
      xPosition > piece.position.x && xPosition < (piece.position.x + squareSize)
    ) {
      piece.selected = !piece.selected
      draw({ canvas, ctx, firstTime })

      setSelectedPiece(`${piece.color} ${piece.name} (${piece.selected ? 'selected' : 'not selected'})`)
    }
  }
}

const Board = () => {
  const boardRef = useRef(null)
  const [selectedPiece, setSelectedPiece] = useState('waiting...')

  useEffect(() => {
    const canvas = boardRef.current
    const ctx = canvas.getContext('2d')
    const firstTime = true
    draw({ canvas, ctx, firstTime })
  }, [])

  return (
    <div>
      <div className='selectedPiece'>
        Selected piece: <b>{selectedPiece}</b>
      </div>

      <canvas
        id='board'
        ref={boardRef}
        onClick={event => boardOnClick({ event, setSelectedPiece })}
      />
    </div>
  )
}

export default Board
