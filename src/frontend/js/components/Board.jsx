/* eslint react/jsx-fragments: 0, no-new: 0 */

import React, { useState } from 'react'
import { Howl } from 'howler'

import pieceImages from './../functions/pieceImages'
import movePieceInArray from './../functions/movePieceInArray'
import { arrayToFen, fenToArray } from './../functions/fenConvert'
import calculateLegalMoves from './../functions/calculateLegalMoves'

import MakeSquares from './MakeSquares'
import PlacePieces from './PlacePieces'
import ShowLegalMoves from './ShowLegalMoves'

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
    size: window.innerWidth <= 768 ? ((window.innerWidth - 40) / 8) : 60,
    colors: {
      first: '#f0d9b5',
      second: '#b58863',
      selected: '#d9c349'
    }
  },
  piece: {
    names: {
      '.': { color: '', name: '' },
      r: { color: 'black', name: 'rook' },
      n: { color: 'black', name: 'knight' },
      b: { color: 'black', name: 'bishop' },
      q: { color: 'black', name: 'queen' },
      k: { color: 'black', name: 'king' },
      p: { color: 'black', name: 'pawn' },
      R: { color: 'white', name: 'rook' },
      N: { color: 'white', name: 'knight' },
      B: { color: 'white', name: 'bishop' },
      Q: { color: 'white', name: 'queen' },
      K: { color: 'white', name: 'king' },
      P: { color: 'white', name: 'pawn' }
    },
    images: {
      'black-bishop': pieceImages.blackBishop,
      'black-king': pieceImages.blackKing,
      'black-knight': pieceImages.blackKnight,
      'black-pawn': pieceImages.blackPawn,
      'black-queen': pieceImages.blackQueen,
      'black-rook': pieceImages.blackRook,
      'white-bishop': pieceImages.whiteBishop,
      'white-king': pieceImages.whiteKing,
      'white-knight': pieceImages.whiteKnight,
      'white-pawn': pieceImages.whitePawn,
      'white-queen': pieceImages.whiteQueen,
      'white-rook': pieceImages.whiteRook
    },
    coordinates: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'R', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['.', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
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
