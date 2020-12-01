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

import defaultPieces from './defaultPieces'

const defaults = {
  board: {
    cols: 8,
    rows: 8
  },
  square: {
    size: 60,
    colors: {
      first: '#f0d9b5',
      second: '#b58863',
      selected: '#d9c349'
    }
  }
}

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

const coordinates = {}
const files = 'abcdefghijklmnopqrstuvwxyz'
for (let rank = 0; rank < defaults.board.cols; rank++) {
  for (let file = 0; file < defaults.board.rows; file++) {
    const rankForObject = rank + 1
    coordinates[files[file] + rankForObject] = {
      x: (defaults.square.size * file),
      y: (defaults.square.size * (defaults.board.cols - rankForObject))
    }
  }
}

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

const PlacePieces = props => {
  const { pieces, setPieces, setSelectedPiece } = props

  const pieceOnClick = piece => {
    for (const key in pieces) {
      const piece = pieces[key]
      if (piece.selected) piece.selected = false
    }

    const selected = Object.prototype.hasOwnProperty.call(piece, 'selected') ? piece.selected : false
    piece.selected = !selected
    setPieces([...pieces])

    setSelectedPiece(`${piece.color} ${piece.name} ${piece.coordinates.file}${piece.coordinates.rank}`)
  }

  return (
    <div className='pieces'>
      {pieces.map((piece, key) => {
        const pieceCoordinates = coordinates[piece.coordinates.file + piece.coordinates.rank]
        const style = {
          width: defaults.square.size,
          height: defaults.square.size,
          top: `${pieceCoordinates.y}px`,
          left: `${pieceCoordinates.x}px`,
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
    </div>
  )
}

const QueensGambitMove = props => {
  const { pieces, setPieces } = props

  const findCurrentIndex = props => {
    const { currentFile, currentRank } = props
    let currentIndex
    for (const key in pieces) {
      const piece = pieces[key]
      if (piece.coordinates.file === currentFile && piece.coordinates.rank === currentRank) {
        currentIndex = key
      }
    }
    return currentIndex
  }

  const findNewIndex = props => {
    const { newFile, newRank } = props
    let newIndex
    let newCoordinateIsFilled
    for (const key in pieces) {
      const piece = pieces[key]
      if (piece.coordinates.file === newFile && piece.coordinates.rank === newRank) {
        newIndex = key
        newCoordinateIsFilled = true
      }
    }
    return {
      newIndex,
      newCoordinateIsFilled
    }
  }

  const movePiece = props => {
    const { currentCoordinate, newCoordinate } = props

    const currentFile = currentCoordinate[0]
    const currentRank = parseInt(currentCoordinate[1])
    const newFile = newCoordinate[0]
    const newRank = parseInt(newCoordinate[1])

    let currentIndex = findCurrentIndex({ currentFile, currentRank })
    const { newIndex, newCoordinateIsFilled } = findNewIndex({ newFile, newRank })

    if (newCoordinateIsFilled) {
      pieces.splice(newIndex, 1)
      currentIndex = findCurrentIndex({ currentFile, currentRank })
    }

    pieces[currentIndex].coordinates = { file: newFile, rank: newRank }

    setPieces([...pieces])
  }

  const moveWithSetTimeout = props => {
    setTimeout(() => {
      movePiece(props)
    }, props.second * 1000)
  }

  const queensGambitMove = () => {
    moveWithSetTimeout({ second: 0, currentCoordinate: 'd2', newCoordinate: 'd4' })
    moveWithSetTimeout({ second: 1, currentCoordinate: 'd7', newCoordinate: 'd5' })
    moveWithSetTimeout({ second: 2, currentCoordinate: 'c2', newCoordinate: 'c4' })
    moveWithSetTimeout({ second: 3, currentCoordinate: 'd5', newCoordinate: 'c4' })
    moveWithSetTimeout({ second: 4, currentCoordinate: 'e2', newCoordinate: 'e3' })
    moveWithSetTimeout({ second: 5, currentCoordinate: 'g8', newCoordinate: 'f6' })
    moveWithSetTimeout({ second: 6, currentCoordinate: 'f1', newCoordinate: 'c4' })
  }

  return (
    <button onClick={queensGambitMove} style={{ marginTop: '20px' }}>
      queen's gambit move
    </button>
  )
}

const Board = () => {
  const [pieces, setPieces] = useState(defaultPieces)
  const [selectedPiece, setSelectedPiece] = useState('waiting...')

  const boardStyle = {
    width: defaults.square.size * defaults.board.cols,
    height: defaults.square.size * defaults.board.rows
  }

  return (
    <React.Fragment>
      <div id='selectedPiece'>
        Selected piece: <b>{selectedPiece}</b>
      </div>

      <QueensGambitMove
        pieces={pieces}
        setPieces={setPieces}
      />

      <div
        id='board'
        style={boardStyle}
      >
        <MakeSquares />
        <PlacePieces
          pieces={pieces}
          setPieces={setPieces}
          setSelectedPiece={setSelectedPiece}
        />
      </div>
    </React.Fragment>
  )
}

export default Board
