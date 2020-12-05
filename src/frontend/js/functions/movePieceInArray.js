const movePieceInArray = props => {
  const { defaults, pieces, oldCoordinates, newCoordinates } = props
  const { files } = defaults.board

  const oldRankIndex = defaults.board.rows - oldCoordinates.rank
  const oldFileIndex = files.indexOf(oldCoordinates.file)
  const pieceLetter = pieces[oldRankIndex][oldFileIndex]
  pieces[oldRankIndex][oldFileIndex] = '.'

  const newRankIndex = defaults.board.rows - newCoordinates.rank
  const newFileIndex = files.indexOf(newCoordinates.file)
  pieces[newRankIndex][newFileIndex] = pieceLetter

  return [...pieces]
}

module.exports = movePieceInArray
