const legalMoves = props => {
  const { piece, defaults, files } = props
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

module.exports = legalMoves
