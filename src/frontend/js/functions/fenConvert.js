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

module.exports = {
  arrayToFen,
  fenToArray
}
