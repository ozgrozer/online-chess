const getPieceOnCoordinate = props => {
  const { defaults, pieces, file, rank } = props
  const { files } = defaults.board

  const oldRankIndex = defaults.board.rows - rank
  const oldFileIndex = files.indexOf(file)
  const letter = pieces[oldRankIndex][oldFileIndex]

  const { color, name } = defaults.piece.names[letter]
  return { letter, color, name }
}

const rookMoves = props => {
  const { piece, pieces, defaults } = props
  const { coordinates } = piece
  const { file, rank } = coordinates
  const { files } = defaults.board
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

  for (const key in possibleMoves) {
    const { file, rank } = possibleMoves[key]
    const { color, name, letter } = getPieceOnCoordinate({ defaults, pieces, file, rank })

    if (letter !== '.') {
      console.log({ file, rank, color, name })

      if (piece.color === color) {
        delete possibleMoves[key]
      }
    }
  }

  return possibleMoves
}

const knightMoves = props => {
  const possibleMoves = []
  return possibleMoves
}

const bishopMoves = props => {
  const possibleMoves = []
  return possibleMoves
}

const queenMoves = props => {
  const possibleMoves = []
  return possibleMoves
}

const kingMoves = props => {
  const possibleMoves = []
  return possibleMoves
}

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

const calculateLegalMoves = props => {
  const pieces = {
    rook: rookMoves,
    knight: knightMoves,
    bishop: bishopMoves,
    queen: queenMoves,
    king: kingMoves,
    pawn: pawnMoves
  }

  return pieces[props.piece.name](props)
}

module.exports = calculateLegalMoves
