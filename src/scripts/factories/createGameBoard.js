const REQUIRED_NUMBER_OF_SHIPS = 10;
const REQUIRED_TYPES_OF_SHIPS = {
  ship4: 1,
  ship3: 2,
  ship2: 3,
  ship1: 4,
};
const MAX_CORD_RANGE = 9;
const MIN_CORD_RANGE = 0;
// const receiveAttack = ({ x, y }) => {};
// const placeShipRandom = (ship) => {};

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

const isShipPlaceable = (start, end, board, isVertical) => {
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
    // if its all good
    return true;
  }

  if (!isVertical) {
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
    // if its all good
    return true;
  }
};

const isShipValid = (ship, [...board], { x, y, isVertical }) => {
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

  if (isVertical) {
    const endPoint = { x, y: y + ship.getLength() - 1 };

    for (let i = startPoint.y; i <= endPoint.y; i += 1) {
      cords.push({ x: startPoint.x, y: i });
    }

    return cords;
  }

  if (!isVertical) {
    const endPoint = { x: x + ship.getLength() - 1, y };

    for (let i = startPoint.x; i <= endPoint.x; i += 1) {
      cords.push({ x: i, y: startPoint.y });
    }

    return cords;
  }
};

const isShipRequired = (ship, boardInfo) => {
  const shipType = `ship${ship.getLength()}`;

  return boardInfo[shipType] + 1 <= REQUIRED_TYPES_OF_SHIPS[shipType];
};

const updateBoardInfo = (ship, boardInfo) => {
  const newBoardInfo = { ...boardInfo };

  newBoardInfo[`ship${ship.getLength()}`] += 1;
  return { ...newBoardInfo };
};

const putShipOnBoard = (ship, board, { x, y, isVertical }) => {
  const startPoint = { x, y };
  const newBoard = [...board];
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

  if (!isVertical) {
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
  }
};

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
  let shipsCount = 0;
  let sunkShips = 0;
  let boardInfo = {
    ship4: 0,
    ship3: 0,
    ship2: 0,
    ship1: 0,
  };

  const shipsData = [];

  return {
    isReady: () => shipsCount === REQUIRED_NUMBER_OF_SHIPS,

    isAllShipsSunk() {
      if (this.isReady()) return shipsCount === sunkShips;

      return false;
    },

    getAliveShipsCount: () => shipsCount - sunkShips,

    placeShipAt(ship, { x = -1, y = -1, isVertical = false } = {}) {
      if (!this.isReady() && isShipValid(ship, board, { x, y, isVertical })) {
        if (isShipRequired(ship, boardInfo)) {
          boardInfo = updateBoardInfo(ship, boardInfo);
          const cords = getAllShipCords(ship, { x, y, isVertical });
          shipsData.push({
            ship,
            cords,
          });
          board = putShipOnBoard(ship, board, { x, y, isVertical });
          shipsCount += 1;

          return true;
        }
      }
      return false;
    },
  };
};

export default createGameBoard;
