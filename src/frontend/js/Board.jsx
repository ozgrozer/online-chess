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
    size: 60,
    colors: {
      first: '#f0d9b5',
      second: '#b58863',
      selected: '#d9c349'
    }
  }
}

const defaultCoordinates = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
]

const pieceNames = {
  r: 'rook',
  n: 'knight',
  b: 'bishop',
  q: 'queen',
  k: 'king',
  p: 'pawn'
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

const calculatePossibleMoves = props => {
  const { piece } = props
  const { name, color, coordinates } = piece
  const { file, rank } = coordinates

  const possibleMoves = []

  if (name === 'pawn') {
    const nextRank = color === 'white' ? rank + 1 : rank - 1
    possibleMoves.push({ rank: nextRank, file })

    const startingRank = color === 'white' ? 2 : 7
    if (rank === startingRank) {
      const nextRank = color === 'white' ? rank + 2 : rank - 2
      possibleMoves.push({ rank: nextRank, file })
    }
  } else if (name === 'rook') {
    for (let col = 0; col < defaults.board.cols; col++) {
      const newFile = (rank - 1) !== col ? files[col] : ''
      if (newFile) {
        possibleMoves.push({ rank, file: newFile })
      }
    }

    for (let row = 0; row < defaults.board.rows; row++) {
      const newRank = (rank) !== row ? row : ''
      if (newRank) {
        possibleMoves.push({ rank: newRank, file })
      }
    }
  }

  return possibleMoves
}

const PlacePieces = props => {
  const { pieces, selectedPiece, setSelectedPiece, setPossibleMoves } = props

  const pieceOnClick = piece => {
    setSelectedPiece(piece)
    const possibleMoves = calculatePossibleMoves({ piece })
    setPossibleMoves(possibleMoves)
  }

  return (
    <div className='pieces'>
      {pieces.map((pieceRow, key1) => {
        return (
          <div key={key1} className='pieceRow'>
            {pieceRow.map((pieceLetter, key2) => {
              const file = files[key2]
              const rank = defaults.board.cols - key1
              const piecePositions = positions[file + rank]
              const color = pieceLetter === pieceLetter.toLowerCase() ? 'black' : 'white'
              const name = pieceNames[pieceLetter.toLowerCase()]
              const selected = selectedPiece.key1 === key1 && selectedPiece.key2 === key2 && name

              if (name) {
                const piece = {
                  key1,
                  key2,
                  name,
                  color,
                  coordinates: { file, rank }
                }

                const style = {
                  width: defaults.square.size,
                  height: defaults.square.size,
                  top: `${piecePositions.y}px`,
                  left: `${piecePositions.x}px`,
                  backgroundImage: `url(${pieceImages[`${color}-${name}`]})`,
                  backgroundColor: selected ? defaults.square.colors.selected : ''
                }

                return (
                  <div
                    key={key2}
                    style={style}
                    className='piece'
                    onClick={() => pieceOnClick(piece)}
                  />
                )
              }
            })}
          </div>
        )
      })}
    </div>
  )
}

const ShowPossibleMoves = props => {
  const { possibleMoves } = props

  return (
    <div className='possibleMoves'>
      {possibleMoves.map((possibleMove, key) => {
        const possibleCoordinates = positions[possibleMove.file + possibleMove.rank]
        const possibleMoveStyle = {
          width: defaults.square.size,
          height: defaults.square.size,
          top: `${possibleCoordinates.y}px`,
          left: `${possibleCoordinates.x}px`
        }

        return (
          <div
            key={key}
            className='possibleMove'
            style={possibleMoveStyle}
          />
        )
      })}
    </div>
  )
}

const arrayToFen = props => {
  const { arrayCoordinates } = props

  const combineFiles = []

  for (const key in arrayCoordinates) {
    const defaultCoordinateRanks = arrayCoordinates[key]
    const combineRanks = []

    for (const key in defaultCoordinateRanks) {
      const defaultCoordinateRank = defaultCoordinateRanks[key]
      combineRanks.push(defaultCoordinateRank)
    }

    const combineRanksString = combineRanks.join('')
      .replace(/\.\.\.\.\.\.\.\./g, 8)
      .replace(/\.\.\.\.\.\.\./g, 7)
      .replace(/\.\.\.\.\.\./g, 6)
      .replace(/\.\.\.\.\./g, 5)
      .replace(/\.\.\.\./g, 4)
      .replace(/\.\.\./g, 3)
      .replace(/\.\./g, 2)
      .replace(/\./g, 1)

    combineFiles.push(combineRanksString)
  }

  return combineFiles.join('/')
}

const fenToArray = props => {
  const { fenCoordinates } = props

  const replaceNumbers = fenCoordinates
    .replace(/8/g, '........')
    .replace(/7/g, '.......')
    .replace(/6/g, '......')
    .replace(/5/g, '.....')
    .replace(/4/g, '....')
    .replace(/3/g, '...')
    .replace(/2/g, '..')
    .replace(/1/g, '.')

  const rows = replaceNumbers.split('/')

  const array = []
  for (const key in rows) {
    const row = rows[key]
    const newRow = []
    for (const key in row) {
      const item = row[key]
      newRow.push(item)
    }
    array.push(newRow)
  }

  return array
}

const Board = () => {
  const [pieces, setPieces] = useState(defaultCoordinates)
  const [possibleMoves, setPossibleMoves] = useState([])
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
            <MakeSquares />
            <PlacePieces
              pieces={pieces}
              setPieces={setPieces}
              selectedPiece={selectedPiece}
              setPossibleMoves={setPossibleMoves}
              setSelectedPiece={setSelectedPiece}
            />
            <ShowPossibleMoves possibleMoves={possibleMoves} />
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
