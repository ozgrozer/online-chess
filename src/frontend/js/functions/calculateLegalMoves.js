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
  const fileIndex = files.indexOf(file)

  const possibleMoves = []

  for (let i = 0; i < defaults.board.cols; i++) {
    const newFile = i === fileIndex ? null : files[i]
    if (newFile) possibleMoves.push({ rank, file: newFile })
  }

  for (let i = 1; i <= defaults.board.rows; i++) {
    const newRank = i === rank ? null : i
    if (newRank) possibleMoves.push({ rank: newRank, file })
  }

  return possibleMoves
}

const calculateLegalMoves = props => {
  const pieces = {
    pawn: pawnMoves,
    rook: rookMoves
  }

  return pieces[props.piece.name](props)
}

module.exports = calculateLegalMoves
