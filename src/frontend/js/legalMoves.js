const pawnMoves = props => {
  const { piece } = props
  const { color, coordinates } = piece
  const { file, rank } = coordinates

  const possibleMoves = []

  const nextRank = color === 'white' ? rank + 1 : rank - 1
  possibleMoves.push({ rank: nextRank, file })

  const startingRank = color === 'white' ? 2 : 7
  if (rank === startingRank) {
    const nextRank = color === 'white' ? rank + 2 : rank - 2
    possibleMoves.push({ rank: nextRank, file })
  }

  return possibleMoves
}

const rookMoves = props => {
  const { piece, defaults, files } = props
  const { coordinates } = piece
  const { file, rank } = coordinates

  const possibleMoves = []

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

  return possibleMoves
}

const legalMoves = props => {
  const pieces = {
    pawn: pawnMoves,
    rook: rookMoves
  }

  return pieces[props.piece.name](props)
}

module.exports = legalMoves
