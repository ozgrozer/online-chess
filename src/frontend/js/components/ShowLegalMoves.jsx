import React from 'react'

const ShowLegalMoves = props => {
  const { pieces, defaults, playSound, setPieces, positions, legalMoves, setLegalMoves, selectedPiece, setSelectedPiece, movePieceInArray } = props

  const legalMoveOnClick = props => {
    const oldCoordinates = selectedPiece.coordinates
    const newCoordinates = props.legalMove
    const newPieces = movePieceInArray({ defaults, pieces, selectedPiece, oldCoordinates, newCoordinates })
    setPieces(newPieces)
    setLegalMoves([])
    setSelectedPiece({})

    if (selectedPiece.color === 'black') {
      playSound('moveOpponent')
    } else {
      playSound('moveSelf')
    }
  }

  return (
    <div className='legalMoves'>
      {legalMoves.map((legalMove, key) => {
        const possibleCoordinates = positions[legalMove.file + legalMove.rank]
        const legalMoveStyle = {
          width: defaults.square.size,
          height: defaults.square.size,
          top: `${possibleCoordinates.y}px`,
          left: `${possibleCoordinates.x}px`
        }

        return (
          <div
            key={key}
            className='legalMove'
            style={legalMoveStyle}
            onClick={() => legalMoveOnClick({ legalMove })}
          />
        )
      })}
    </div>
  )
}

export default ShowLegalMoves
