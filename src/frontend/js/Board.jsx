/* eslint react/jsx-fragments: 0 */

import React, { useState } from 'react'

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

const defaultPieces = [
  { color: 'black', name: 'rook', position: { x: (squareSize * 0), y: (squareSize * 0) } },
  { color: 'black', name: 'knight', position: { x: (squareSize * 1), y: (squareSize * 0) } },
  { color: 'black', name: 'bishop', position: { x: (squareSize * 2), y: (squareSize * 0) } },
  { color: 'black', name: 'queen', position: { x: (squareSize * 3), y: (squareSize * 0) } },
  { color: 'black', name: 'king', position: { x: (squareSize * 4), y: (squareSize * 0) } },
  { color: 'black', name: 'bishop', position: { x: (squareSize * 5), y: (squareSize * 0) } },
  { color: 'black', name: 'knight', position: { x: (squareSize * 6), y: (squareSize * 0) } },
  { color: 'black', name: 'rook', position: { x: (squareSize * 7), y: (squareSize * 0) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 0), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 1), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 2), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 3), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 4), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 5), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 6), y: (squareSize * 1) } },
  { color: 'black', name: 'pawn', position: { x: (squareSize * 7), y: (squareSize * 1) } },

  { color: 'white', name: 'rook', position: { x: (squareSize * 0), y: (squareSize * 7) } },
  { color: 'white', name: 'knight', position: { x: (squareSize * 1), y: (squareSize * 7) } },
  { color: 'white', name: 'bishop', position: { x: (squareSize * 2), y: (squareSize * 7) } },
  { color: 'white', name: 'queen', position: { x: (squareSize * 3), y: (squareSize * 7) } },
  { color: 'white', name: 'king', position: { x: (squareSize * 4), y: (squareSize * 7) } },
  { color: 'white', name: 'bishop', position: { x: (squareSize * 5), y: (squareSize * 7) } },
  { color: 'white', name: 'knight', position: { x: (squareSize * 6), y: (squareSize * 7) } },
  { color: 'white', name: 'rook', position: { x: (squareSize * 7), y: (squareSize * 7) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 0), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 1), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 2), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 3), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 4), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 5), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 6), y: (squareSize * 6) } },
  { color: 'white', name: 'pawn', position: { x: (squareSize * 7), y: (squareSize * 6) } }
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

const Board = () => {
  const [pieces, setPieces] = useState(defaultPieces)

  const [selectedPiece, setSelectedPiece] = useState('waiting...')

  const MakeSquares = () => {
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
          x: squareSize * x,
          y: squareSize * y
        })
      }
    }

    return (
      <React.Fragment>
        {squares.map((square, key) => {
          const style = {
            width: squareSize,
            height: squareSize,
            top: `${square.y}px`,
            left: `${square.x}px`,
            backgroundColor: square.color
          }

          return <div key={key} style={style} className='square' />
        })}
      </React.Fragment>
    )
  }

  const pieceOnClick = piece => {
    for (const key in pieces) {
      const piece = pieces[key]
      if (piece.selected) piece.selected = false
    }

    const selected = Object.prototype.hasOwnProperty.call(piece, 'selected') ? piece.selected : false
    piece.selected = !selected
    setPieces([...pieces])

    setSelectedPiece(`${piece.color} ${piece.name} (${piece.selected ? 'selected' : 'not selected'})`)
  }

  const PlacePieces = () => {
    return (
      <React.Fragment>
        {pieces.map((piece, key) => {
          const style = {
            width: squareSize,
            height: squareSize,
            top: `${piece.position.y}px`,
            left: `${piece.position.x}px`,
            backgroundColor: piece.selected ? defaults.square.colors.selected : '',
            backgroundImage: `url(${pieceImages[`${piece.color}-${piece.name}`]})`
          }

          return (
            <div
              key={key}
              style={style}
              className='piece'
              onClick={() => pieceOnClick(piece)}
            />
          )
        })}
      </React.Fragment>
    )
  }

  const boardStyle = {
    width: defaults.square.size * defaults.board.cols,
    height: defaults.square.size * defaults.board.rows
  }

  return (
    <React.Fragment>
      <div id='selectedPiece'>
        Selected piece: <b>{selectedPiece}</b>
      </div>

      <div id='board' style={boardStyle}>
        <MakeSquares />
        <PlacePieces />
      </div>
    </React.Fragment>
  )
}

export default Board
