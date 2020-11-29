const coordinates = squareSize => {
  const coordinates_ = {
    a1: { x: (squareSize * 0), y: (squareSize * 0) },
    b1: { x: (squareSize * 1), y: (squareSize * 0) },
    c1: { x: (squareSize * 2), y: (squareSize * 0) },
    d1: { x: (squareSize * 3), y: (squareSize * 0) },
    e1: { x: (squareSize * 4), y: (squareSize * 0) },
    f1: { x: (squareSize * 5), y: (squareSize * 0) },
    g1: { x: (squareSize * 6), y: (squareSize * 0) },
    h1: { x: (squareSize * 7), y: (squareSize * 0) },

    a2: { x: (squareSize * 0), y: (squareSize * 1) },
    b2: { x: (squareSize * 1), y: (squareSize * 1) },
    c2: { x: (squareSize * 2), y: (squareSize * 1) },
    d2: { x: (squareSize * 3), y: (squareSize * 1) },
    e2: { x: (squareSize * 4), y: (squareSize * 1) },
    f2: { x: (squareSize * 5), y: (squareSize * 1) },
    g2: { x: (squareSize * 6), y: (squareSize * 1) },
    h2: { x: (squareSize * 7), y: (squareSize * 1) },

    a7: { x: (squareSize * 0), y: (squareSize * 6) },
    b7: { x: (squareSize * 1), y: (squareSize * 6) },
    c7: { x: (squareSize * 2), y: (squareSize * 6) },
    d7: { x: (squareSize * 3), y: (squareSize * 6) },
    e7: { x: (squareSize * 4), y: (squareSize * 6) },
    f7: { x: (squareSize * 5), y: (squareSize * 6) },
    g7: { x: (squareSize * 6), y: (squareSize * 6) },
    h7: { x: (squareSize * 7), y: (squareSize * 6) },

    a8: { x: (squareSize * 0), y: (squareSize * 7) },
    b8: { x: (squareSize * 1), y: (squareSize * 7) },
    c8: { x: (squareSize * 2), y: (squareSize * 7) },
    d8: { x: (squareSize * 3), y: (squareSize * 7) },
    e8: { x: (squareSize * 4), y: (squareSize * 7) },
    f8: { x: (squareSize * 5), y: (squareSize * 7) },
    g8: { x: (squareSize * 6), y: (squareSize * 7) },
    h8: { x: (squareSize * 7), y: (squareSize * 7) }
  }

  return coordinates_
}

module.exports = coordinates
