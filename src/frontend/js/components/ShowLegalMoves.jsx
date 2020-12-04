import React from 'react'

const ShowLegalMoves = props => {
  const { legalMoves, defaults, positions } = props

  return (
    <div className='legalMoves'>
      {legalMoves.map((legalMove, key) => {
        const possibleCoordinates = positions[legalMove.file + legalMove.rank]
        const legalMovestyle = {
          width: defaults.square.size,
          height: defaults.square.size,
          top: `${possibleCoordinates.y}px`,
          left: `${possibleCoordinates.x}px`
        }

        return (
          <div
            key={key}
            className='legalMove'
            style={legalMovestyle}
          />
        )
      })}
    </div>
  )
}

export default ShowLegalMoves
