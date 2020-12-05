/* eslint react/jsx-fragments: 0, no-new: 0 */

import React, { useState } from 'react'
import { Howl } from 'howler'

import movePieceInArray from './../functions/movePieceInArray'
import { arrayToFen, fenToArray } from './../functions/fenConvert'
import calculateLegalMoves from './../functions/calculateLegalMoves'

import MakeSquares from './MakeSquares'
import PlacePieces from './PlacePieces'
import ShowLegalMoves from './ShowLegalMoves'

import blackBishop from './../../img/pieces/svg/blackBishop.svg'
import blackKing from './../../img/pieces/svg/blackKing.svg'
import blackKnight from './../../img/pieces/svg/blackKnight.svg'
import blackPawn from './../../img/pieces/svg/blackPawn.svg'
import blackQueen from './../../img/pieces/svg/blackQueen.svg'
import blackRook from './../../img/pieces/svg/blackRook.svg'
import whiteBishop from './../../img/pieces/svg/whiteBishop.svg'
import whiteKing from './../../img/pieces/svg/whiteKing.svg'
import whiteKnight from './../../img/pieces/svg/whiteKnight.svg'
import whitePawn from './../../img/pieces/svg/whitePawn.svg'
import whiteQueen from './../../img/pieces/svg/whiteQueen.svg'
import whiteRook from './../../img/pieces/svg/whiteRook.svg'

import captureSfx from './../../sfx/pieces/capture.mp3'
import moveSelfSfx from './../../sfx/pieces/moveSelf.mp3'
import moveOpponentSfx from './../../sfx/pieces/moveOpponent.mp3'

const defaults = {
  board: {
    cols: 8,
    rows: 8,
    files: 'abcdefgh'
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
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ]
  },
  sfx: {
    capture: captureSfx,
    moveSelf: moveSelfSfx,
    moveOpponent: moveOpponentSfx
  }
}

const positions = {}
for (let rank = 0; rank < defaults.board.cols; rank++) {
  for (let file = 0; file < defaults.board.rows; file++) {
    const rankForObject = rank + 1
    positions[defaults.board.files[file] + rankForObject] = {
      x: (defaults.square.size * file),
      y: (defaults.square.size * (defaults.board.cols - rankForObject))
    }
  }
}

(function () {
  for (const key in defaults.sfx) {
    const sfx = defaults.sfx[key]
    new Howl({ preload: true, src: [sfx] })
  }
})()
const playSound = name => {
  const sound = new window.Howl({ src: [defaults.sfx[name]] })
  sound.play()
}

const Board = () => {
  const [pieces, setPieces_] = useState(defaults.piece.coordinates)
  const [legalMoves, setLegalMoves] = useState([])
  const [selectedPiece, setSelectedPiece] = useState({})
  const selectedPieceReadable = selectedPiece.color
    ? `${selectedPiece.color} ${selectedPiece.name} ${selectedPiece.coordinates.file}${selectedPiece.coordinates.rank}`
    : 'waiting...'

  const boardStyle = {
    width: defaults.square.size * defaults.board.cols,
    height: defaults.square.size * defaults.board.rows
  }

  const setPieces = newArray => {
    setPieces_(newArray)
    const newFen = arrayToFen({ arrayCoordinates: newArray })
    setFenCoordinates(newFen)
  }

  const currentFen = arrayToFen({ arrayCoordinates: pieces })
  const [fenCoordinates, setFenCoordinates] = useState(currentFen)
  const fenCoordinatesOnChange = event => {
    const newArray = fenToArray({ fenCoordinates: event.target.value })
    setPieces(newArray)
  }

  const arrayCoordinates = JSON.stringify(pieces)
    .replace(/\[\[/g, '[\n  [')
    .replace(/\]\]/g, ']\n]')
    .replace(/,\[/g, ',\n  [')
  const arrayCoordinatesOnChange = event => {
    const newArray = JSON.parse(event.target.value)
    setPieces(newArray)
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
              pieces={pieces}
              defaults={defaults}
              positions={positions}
              selectedPiece={selectedPiece}
              setLegalMoves={setLegalMoves}
              setSelectedPiece={setSelectedPiece}
              calculateLegalMoves={calculateLegalMoves}
            />
            <ShowLegalMoves
              pieces={pieces}
              defaults={defaults}
              playSound={playSound}
              setPieces={setPieces}
              positions={positions}
              legalMoves={legalMoves}
              setLegalMoves={setLegalMoves}
              selectedPiece={selectedPiece}
              setSelectedPiece={setSelectedPiece}
              movePieceInArray={movePieceInArray}
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
