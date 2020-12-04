/* eslint react/jsx-fragments: 0 */

import React, { useState } from 'react'

import { arrayToFen, fenToArray } from './../functions/fenConvert'
import calculateLegalMoves from './../functions/calculateLegalMoves'

import MakeSquares from './MakeSquares'
import PlacePieces from './PlacePieces'
import ShowLegalMoves from './ShowLegalMoves'

import blackBishop from './../../img/pieces/blackBishop.png'
import blackKing from './../../img/pieces/blackKing.png'
import blackKnight from './../../img/pieces/blackKnight.png'
import blackPawn from './../../img/pieces/blackPawn.png'
import blackQueen from './../../img/pieces/blackQueen.png'
import blackRook from './../../img/pieces/blackRook.png'
import whiteBishop from './../../img/pieces/whiteBishop.png'
import whiteKing from './../../img/pieces/whiteKing.png'
import whiteKnight from './../../img/pieces/whiteKnight.png'
import whitePawn from './../../img/pieces/whitePawn.png'
import whiteQueen from './../../img/pieces/whiteQueen.png'
import whiteRook from './../../img/pieces/whiteRook.png'

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
  },
  piece: {
    names: {
      r: 'rook',
      n: 'knight',
      b: 'bishop',
      q: 'queen',
      k: 'king',
      p: 'pawn'
    },
    images: {
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
    },
    coordinates: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'R', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ]
  }
}

const positions = {}
const files = 'abcdefghijklmnopqrstuvwxyz'
for (let rank = 0; rank < defaults.board.cols; rank++) {
  for (let file = 0; file < defaults.board.rows; file++) {
    const rankForObject = rank + 1
    positions[files[file] + rankForObject] = {
      x: (defaults.square.size * file),
      y: (defaults.square.size * (defaults.board.cols - rankForObject))
    }
  }
}
console.log(positions)

const Board = () => {
  const [pieces, setPieces] = useState(defaults.piece.coordinates)
  const [legalMoves, setLegalMoves] = useState([])
  const [selectedPiece, setSelectedPiece] = useState({ color: '', name: '', coordinates: { file: '', rank: '' } })
  const selectedPieceReadable = selectedPiece.color
    ? `${selectedPiece.color} ${selectedPiece.name} ${selectedPiece.coordinates.file}${selectedPiece.coordinates.rank}`
    : 'waiting...'

  const boardStyle = {
    width: defaults.square.size * defaults.board.cols,
    height: defaults.square.size * defaults.board.rows
  }

  const arrayToFen_ = arrayToFen({ arrayCoordinates: pieces })
  const [fenCoordinates, setFenCoordinates] = useState(arrayToFen_)
  const fenCoordinatesOnChange = event => {
    const fenCoordinates = event.target.value
    setFenCoordinates(fenCoordinates)

    const fenToArray_ = fenToArray({ fenCoordinates })
    setPieces(fenToArray_)
  }

  const arrayCoordinates = JSON.stringify(pieces)
    .replace(/\[\[/g, '[\n  [')
    .replace(/\]\]/g, ']\n]')
    .replace(/,\[/g, ',\n  [')
  const arrayCoordinatesOnChange = event => {
    const pieces = JSON.parse(event.target.value)
    setPieces(pieces)

    const arrayToFen_ = arrayToFen({ arrayCoordinates: pieces })
    setFenCoordinates(arrayToFen_)
  }

  return (
    <React.Fragment>
      <div className='boardWrapper'>
        <div className='boardLeft'>
          <div
            className='board'
            style={boardStyle}
          >
            <MakeSquares
              defaults={defaults}
            />
            <PlacePieces
              files={files}
              pieces={pieces}
              defaults={defaults}
              positions={positions}
              setPieces={setPieces}
              selectedPiece={selectedPiece}
              setLegalMoves={setLegalMoves}
              setSelectedPiece={setSelectedPiece}
              calculateLegalMoves={calculateLegalMoves}
            />
            <ShowLegalMoves
              defaults={defaults}
              positions={positions}
              legalMoves={legalMoves}
            />
          </div>
        </div>

        <div className='boardRight'>
          <div className='selectedPiece'>
            Selected piece: <b>{selectedPieceReadable}</b>
          </div>

          <textarea
            rows='2'
            value={fenCoordinates}
            className='defaultCoordinates'
            onChange={fenCoordinatesOnChange}
            style={{ width: boardStyle.width }}
          />

          <textarea
            rows='10'
            value={arrayCoordinates}
            className='defaultCoordinates'
            onChange={arrayCoordinatesOnChange}
            style={{ width: boardStyle.width }}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Board
