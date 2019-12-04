const REQUIRED_NUMBER_OF_SHIPS = 10;
const REQUIRED_TYPES_OF_SHIPS = {
  ship4: 1,
  ship3: 2,
  ship2: 3,
  ship1: 4,
};
const MAX_CORD_RANGE = 9;
const MIN_CORD_RANGE = 0;

export { REQUIRED_TYPES_OF_SHIPS };
export { MAX_CORD_RANGE };
export { MIN_CORD_RANGE };

const isCordsValid = ({ x, y }) => {
  const isCordBetweenRange = (cord) => MIN_CORD_RANGE <= cord && cord <= MAX_CORD_RANGE;

  const validateCord = (cord) => {
    if (!Number.isNaN(cord) && typeof cord === 'number') {
      return isCordBetweenRange(cord);
    }

    return false;
  };

  return validateCord(x) && validateCord(y);
};

export { isCordsValid };

const isShipPlaceable = (start, end, board, isVertical) => {
  // vertical position
  if (isVertical) {
    // check the center
    for (let i = start.y; i <= end.y; i += 1) {
      if (board[start.x][i] === 's' || board[start.x][i] === 'B') {
        return false;
      }
    }

    // check the left side
    for (let i = start.y - 1; i <= end.y + 1; i += 1) {
      if (isCordsValid({ x: start.x - 1, y: i }) && board[start.x - 1][i] === 's') {
        return false;
      }
    }

    // check the right side
    for (let i = start.y - 1; i <= end.y + 1; i += 1) {
      if (isCordsValid({ x: start.x + 1, y: i }) && board[start.x + 1][i] === 's') {
        return false;
      }
    }

    // check the top side
    if (isCordsValid({ x: start.x, y: start.y - 1 }) && board[start.x][start.y - 1] === 's') {
      return false;
    }

    // check the bottom side
    if (isCordsValid({ x: start.x, y: end.y + 1 }) && board[start.x][end.y + 1] === 's') {
      return false;
    }

    // if all is good
    return true;
  }

  // horizontal position
  // check the center
  for (let i = start.x; i <= end.x; i += 1) {
    if (board[i][start.y] === 's' || board[i][start.y] === 'B') {
      return false;
    }
  }

  // check the top side
  for (let i = start.x - 1; i <= end.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: start.y - 1 }) && board[i][start.y - 1] === 's') {
      return false;
    }
  }

  // check the bottom side
  for (let i = start.x + 1; i <= end.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: start.y + 1 }) && board[i][start.y + 1] === 's') {
      return false;
    }
  }

  // check the left side
  if (isCordsValid({ x: start.x - 1, y: start.y }) && board[start.x - 1][start.y] === 's') {
    return false;
  }

  // check the right side
  if (isCordsValid({ x: start.x + 1, y: start.y }) && board[start.x + 1][start.y] === 's') {
    return false;
  }

  // if all is good
  return true;
};

const isShipValid = (ship, board, { x, y, isVertical }) => {
  if (ship && isCordsValid({ x, y })) {
    const startPoint = { x, y };
    const endPoint = isVertical
      ? { x, y: y + ship.getLength() - 1 }
      : { x: x + ship.getLength() - 1, y };

    return isCordsValid(endPoint) && isShipPlaceable(startPoint, endPoint, board, isVertical);
  }

  return false;
};

const getAllShipCords = (ship, { x, y, isVertical }) => {
  const cords = [];
  const startPoint = { x, y };

  // vertical position
  if (isVertical) {
    const endPoint = { x, y: y + ship.getLength() - 1 };

    for (let i = startPoint.y; i <= endPoint.y; i += 1) {
      cords.push({ x: startPoint.x, y: i });
    }

    return cords;
  }

  // horizontal position
  const endPoint = { x: x + ship.getLength() - 1, y };

  for (let i = startPoint.x; i <= endPoint.x; i += 1) {
    cords.push({ x: i, y: startPoint.y });
  }

  return cords;
};

const isShipRequired = (ship, boardInfo) => {
  const shipType = `ship${ship.getLength()}`;

  return boardInfo[shipType] + 1 <= REQUIRED_TYPES_OF_SHIPS[shipType];
};

const addShipToBoardInfo = (ship, boardInfo) => {
  const newBoardInfo = { ...boardInfo };

  newBoardInfo[`ship${ship.getLength()}`] += 1;
  return { ...newBoardInfo };
};

const removeShipFromBoardInfo = (ship, boardInfo) => {
  const newBoardInfo = { ...boardInfo };

  newBoardInfo[`ship${ship.getLength()}`] -= 1;
  return { ...newBoardInfo };
};

const putShipOnBoard = (ship, board, { x, y, isVertical }) => {
  const startPoint = { x, y };
  const newBoard = JSON.parse(JSON.stringify(board));

  // vertical position
  if (isVertical) {
    const endPoint = { x, y: y + ship.getLength() - 1 };

    // place the ship
    for (let i = startPoint.y; i <= endPoint.y; i += 1) {
      newBoard[startPoint.x][i] = 's';
    }

    // place the left border
    for (let i = startPoint.y - 1; i <= endPoint.y + 1; i += 1) {
      if (isCordsValid({ x: startPoint.x - 1, y: i })) {
        newBoard[startPoint.x - 1][i] = 'B';
      }
    }

    // place the right border
    for (let i = startPoint.y - 1; i <= endPoint.y + 1; i += 1) {
      if (isCordsValid({ x: startPoint.x + 1, y: i })) {
        newBoard[startPoint.x + 1][i] = 'B';
      }
    }

    // place the top border
    if (isCordsValid({ x: startPoint.x, y: startPoint.y - 1 })) {
      newBoard[startPoint.x][startPoint.y - 1] = 'B';
    }

    // place the bottom border
    if (isCordsValid({ x: startPoint.x, y: endPoint.y + 1 })) {
      newBoard[startPoint.x][endPoint.y + 1] = 'B';
    }

    return newBoard;
  }

  // horizontal position
  const endPoint = { x: x + ship.getLength() - 1, y };

  // place the ship
  for (let i = startPoint.x; i <= endPoint.x; i += 1) {
    newBoard[i][startPoint.y] = 's';
  }

  // place the top border
  for (let i = startPoint.x - 1; i <= endPoint.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: startPoint.y - 1 })) {
      newBoard[i][startPoint.y - 1] = 'B';
    }
  }

  // place the bottom border
  for (let i = startPoint.x - 1; i <= endPoint.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: startPoint.y + 1 })) {
      newBoard[i][startPoint.y + 1] = 'B';
    }
  }

  // place the left border
  if (isCordsValid({ x: startPoint.x - 1, y: startPoint.y })) {
    newBoard[startPoint.x - 1][startPoint.y] = 'B';
  }

  // place the right border
  if (isCordsValid({ x: endPoint.x + 1, y: startPoint.y })) {
    newBoard[endPoint.x + 1][startPoint.y] = 'B';
  }

  return newBoard;
};

const isBorderForAnotherShip = (board, { x, y }) => {
  if (isCordsValid({ x: x - 1, y }) && board[x - 1][y] === 's') return true;
  if (isCordsValid({ x: x + 1, y }) && board[x + 1][y] === 's') return true;
  if (isCordsValid({ x, y: y - 1 }) && board[x][y - 1] === 's') return true;
  if (isCordsValid({ x: x - 1, y: y - 1 }) && board[x - 1][y - 1] === 's') return true;
  if (isCordsValid({ x: x + 1, y: y - 1 }) && board[x + 1][y - 1] === 's') return true;
  if (isCordsValid({ x, y: y + 1 }) && board[x][y + 1] === 's') return true;
  if (isCordsValid({ x: x - 1, y: y + 1 }) && board[x - 1][y + 1] === 's') return true;
  if (isCordsValid({ x: x + 1, y: y + 1 }) && board[x + 1][y + 1] === 's') return true;

  return false;
};

const removeShipFromBoard = (shipData, board) => {
  const { ship, isVertical } = shipData;
  const { x, y } = shipData.cords[0];
  const startPoint = { x, y };
  const newBoard = JSON.parse(JSON.stringify(board));

  // vertical position
  if (isVertical) {
    const endPoint = { x, y: y + ship.getLength() - 1 };

    // remove the ship
    for (let i = startPoint.y; i <= endPoint.y; i += 1) {
      newBoard[startPoint.x][i] = '~';
    }

    // remove the left border
    for (let i = startPoint.y - 1; i <= endPoint.y + 1; i += 1) {
      if (isCordsValid({ x: startPoint.x - 1, y: i })) {
        if (!isBorderForAnotherShip(newBoard, { x: startPoint.x - 1, y: i })) {
          newBoard[startPoint.x - 1][i] = '~';
        }
      }
    }

    // remove the right border
    for (let i = startPoint.y - 1; i <= endPoint.y + 1; i += 1) {
      if (isCordsValid({ x: startPoint.x + 1, y: i })) {
        if (!isBorderForAnotherShip(newBoard, { x: startPoint.x + 1, y: i })) {
          newBoard[startPoint.x + 1][i] = '~';
        }
      }
    }

    // remove the top border
    if (isCordsValid({ x: startPoint.x, y: startPoint.y - 1 })) {
      if (!isBorderForAnotherShip(newBoard, { x: startPoint.x, y: startPoint.y - 1 })) {
        newBoard[startPoint.x][startPoint.y - 1] = '~';
      }
    }

    // remove the bottom border
    if (isCordsValid({ x: startPoint.x, y: endPoint.y + 1 })) {
      if (!isBorderForAnotherShip(newBoard, { x: startPoint.x, y: endPoint.y + 1 })) {
        newBoard[startPoint.x][endPoint.y + 1] = '~';
      }
    }

    return newBoard;
  }

  // horizontal position
  const endPoint = { x: x + ship.getLength() - 1, y };

  // remove the ship
  for (let i = startPoint.x; i <= endPoint.x; i += 1) {
    newBoard[i][startPoint.y] = '~';
  }

  // remove the top border
  for (let i = startPoint.x - 1; i <= endPoint.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: startPoint.y - 1 })) {
      if (!isBorderForAnotherShip(newBoard, { x: i, y: startPoint.y - 1 })) {
        newBoard[i][startPoint.y - 1] = '~';
      }
    }
  }

  // remove the bottom border
  for (let i = startPoint.x - 1; i <= endPoint.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: startPoint.y + 1 })) {
      if (!isBorderForAnotherShip(newBoard, { x: i, y: startPoint.y + 1 })) {
        newBoard[i][startPoint.y + 1] = '~';
      }
    }
  }

  // remove the left border
  if (isCordsValid({ x: startPoint.x - 1, y: startPoint.y })) {
    if (!isBorderForAnotherShip(newBoard, { x: startPoint.x - 1, y: startPoint.y })) {
      newBoard[startPoint.x - 1][startPoint.y] = '~';
    }
  }

  // remove the right border
  if (isCordsValid({ x: endPoint.x + 1, y: startPoint.y })) {
    if (!isBorderForAnotherShip(newBoard, { x: endPoint.x + 1, y: startPoint.y })) {
      newBoard[endPoint.x + 1][startPoint.y] = '~';
    }
  }

  return newBoard;
};

const removeShipBorders = (shipData, board) => {
  const { ship, isVertical } = shipData;
  const { x, y } = shipData.cords[0];
  const startPoint = { x, y };
  const newBoard = JSON.parse(JSON.stringify(board));

  const clearedBorders = [];

  // vertical position
  if (isVertical) {
    const endPoint = { x, y: y + ship.getLength() - 1 };

    // remove the left border
    for (let i = startPoint.y - 1; i <= endPoint.y + 1; i += 1) {
      if (isCordsValid({ x: startPoint.x - 1, y: i })) {
        newBoard[startPoint.x - 1][i] = '*';
        clearedBorders.push({ x: startPoint.x - 1, y: i });
      }
    }

    // remove the right border
    for (let i = startPoint.y - 1; i <= endPoint.y + 1; i += 1) {
      if (isCordsValid({ x: startPoint.x + 1, y: i })) {
        newBoard[startPoint.x + 1][i] = '*';
        clearedBorders.push({ x: startPoint.x + 1, y: i });
      }
    }

    // remove the top border
    if (isCordsValid({ x: startPoint.x, y: startPoint.y - 1 })) {
      newBoard[startPoint.x][startPoint.y - 1] = '*';
      clearedBorders.push({ x: startPoint.x, y: startPoint.y - 1 });
    }

    // remove the bottom border
    if (isCordsValid({ x: startPoint.x, y: endPoint.y + 1 })) {
      newBoard[startPoint.x][endPoint.y + 1] = '*';
      clearedBorders.push({ x: startPoint.x, y: endPoint.y + 1 });
    }

    return { newBoard, clearedBorders };
  }

  // horizontal position
  const endPoint = { x: x + ship.getLength() - 1, y };

  // remove the top border
  for (let i = startPoint.x - 1; i <= endPoint.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: startPoint.y - 1 })) {
      newBoard[i][startPoint.y - 1] = '*';
      clearedBorders.push({ x: i, y: startPoint.y - 1 });
    }
  }

  // remove the bottom border
  for (let i = startPoint.x - 1; i <= endPoint.x + 1; i += 1) {
    if (isCordsValid({ x: i, y: startPoint.y + 1 })) {
      newBoard[i][startPoint.y + 1] = '*';
      clearedBorders.push({ x: i, y: startPoint.y + 1 });
    }
  }

  // remove the left border
  if (isCordsValid({ x: startPoint.x - 1, y: startPoint.y })) {
    newBoard[startPoint.x - 1][startPoint.y] = '*';
    clearedBorders.push({ x: startPoint.x - 1, y: startPoint.y });
  }

  // remove the right border
  if (isCordsValid({ x: endPoint.x + 1, y: startPoint.y })) {
    newBoard[endPoint.x + 1][startPoint.y] = '*';
    clearedBorders.push({ x: endPoint.x + 1, y: startPoint.y });
  }

  return { newBoard, clearedBorders };
};

const getRandomCord = () => Math.floor(Math.random() * (MAX_CORD_RANGE + 1));

const getRandomPosition = () => !!Math.floor(Math.random() * 2);

const findShipData = (shipsData, { x, y }) => (
  shipsData.find((s) => s.cords.find((c) => c.x === x && c.y === y)));

const getPositionIndex = (ship, { x, y }) => ship.cords.findIndex((c) => c.x === x && c.y === y);

const removeShipData = (shipsData, { x, y }) => (
  shipsData.filter((s) => !s.cords.find((c) => c.x === x && c.y === y))
);

const createGameBoard = () => {
  let board = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  let boardReady = false;
  let shipsCount = 0;
  let sunkShips = 0;
  let shipsData = [];
  let boardInfo = {
    ship4: 0,
    ship3: 0,
    ship2: 0,
    ship1: 0,
  };

  return {
    isReady: () => shipsCount === REQUIRED_NUMBER_OF_SHIPS && boardReady,

    setBoardToReady() {
      if (shipsCount === REQUIRED_NUMBER_OF_SHIPS) {
        boardReady = true;
      }

      return this;
    },

    isAllShipsSunk() {
      if (this.isReady()) return shipsCount === sunkShips;

      return false;
    },

    getAliveShipsCount: () => shipsCount - sunkShips,

    placeShipAt(ship, { x = -1, y = -1, isVertical = false } = {}) {
      if (!this.isReady() && isShipValid(ship, board, { x, y, isVertical })) {
        if (isShipRequired(ship, boardInfo)) {
          boardInfo = addShipToBoardInfo(ship, boardInfo);
          const cords = getAllShipCords(ship, { x, y, isVertical });
          shipsData.push({
            ship,
            cords,
            isVertical,
          });
          board = putShipOnBoard(ship, board, { x, y, isVertical });
          shipsCount += 1;

          return true;
        }
      }

      return false;
    },

    replaceShipFrom({ cx = -1, cy = -1 }, { nx = -1, ny = -1, isVertical = false } = {}) {
      if (!this.isReady()) {
        const shipData = findShipData(shipsData, { x: cx, y: cy });

        if (shipData) {
          const bBoard = JSON.parse(JSON.stringify(board));
          const bShipsData = [...shipsData];
          const bBoardInfo = { ...boardInfo };

          board = removeShipFromBoard(shipData, board);
          shipsData = removeShipData(shipsData, { x: cx, y: cy });
          boardInfo = removeShipFromBoardInfo(shipData.ship, boardInfo);
          shipsCount -= 1;

          if (!this.placeShipAt(shipData.ship, { x: nx, y: ny, isVertical })) {
            board = bBoard;
            shipsData = bShipsData;
            boardInfo = bBoardInfo;
            shipsCount += 1;

            return false;
          }

          return true;
        }
      }

      return false;
    },

    placeShipRandom(ship) {
      if (!isShipRequired(ship, boardInfo)) return false;
      let x;
      let y;
      let isVertical;

      do {
        x = getRandomCord();
        y = getRandomCord();
        isVertical = getRandomPosition();
      } while (!this.placeShipAt(ship, { x, y, isVertical }));

      return { x, y, isVertical };
    },

    receiveAttack({ x, y }) {
      if (this.isReady() && isCordsValid({ x, y })) {
        if (board[x][y] === 's') {
          const damagedShipData = findShipData(shipsData, { x, y });
          const damagedPosition = getPositionIndex(damagedShipData, { x, y });

          if (damagedShipData.ship.hitAt({ position: damagedPosition + 1 }).isSunk()) {
            sunkShips += 1;
            board[x][y] = 'x';
            const { newBoard, clearedBorders } = removeShipBorders(damagedShipData, board);
            board = newBoard;

            return { damagedShipData, clearedBorders };
          }

          board[x][y] = 'x';
          return true;
        }

        // attack in the same spot
        if (board[x][y] === '*' || board[x][y] === 'x') return '*';

        // missed
        board[x][y] = '*';
        return false;
      }

      return false;
    },
  };
};

export default createGameBoard;
export { getRandomCord };

//  '~' - water or an empty spot
//  'B' - border of ship
//  's' - ship itself
//  'x' - ship was hit
//  '*' - missed hit
