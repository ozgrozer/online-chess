import React from 'react'

const PlacePieces = props => {
  const { pieces, selectedPiece, setSelectedPiece, setLegalMoves, defaults, positions, calculateLegalMoves } = props

  const pieceOnClick = piece => {
    setSelectedPiece(piece)
    const legalMoves = calculateLegalMoves({ piece, pieces, defaults })
    setLegalMoves(legalMoves)
  }

  return (
    <div className='pieces'>
      {pieces.map((pieceRow, key1) => {
        return (
          <div key={key1} className='pieceRow'>
            {pieceRow.map((pieceLetter, key2) => {
              const file = defaults.board.files[key2]
              const rank = defaults.board.cols - key1
              const piecePositions = positions[file + rank]
              const color = pieceLetter === pieceLetter.toLowerCase() ? 'black' : 'white'
              const name = defaults.piece.names[pieceLetter.toLowerCase()]
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
                  backgroundColor: selected ? defaults.square.colors.selected : '',
                  backgroundImage: `url(${defaults.piece.images[`${color}-${name}`]})`
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

export default PlacePieces
