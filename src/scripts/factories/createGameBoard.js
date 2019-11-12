const REQUIRED_NUMBER_OF_SHIPS = 10;
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
  // isVertical
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
  // !isVertical
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
};

const isShipValid = (ship, [...board], { x, y, isVertical }) => {
  if (ship && isCordsValid({ x, y })) {
    const startPoint = { x, y };
    const endPoint = isVertical ? { x, y: y + ship.getLength() } : { x: x + ship.getLength(), y };

    return isCordsValid(endPoint) && isShipPlaceable(startPoint, endPoint, board, isVertical);
  }

  return false;
};

const createGameBoard = () => {
  const board = [
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

  return {
    isReady: () => shipsCount === REQUIRED_NUMBER_OF_SHIPS,

    isAllShipsSunk() {
      if (this.isReady()) return shipsCount === sunkShips;

      return false;
    },

    getAliveShipsCount: () => shipsCount - sunkShips,

    // TODO
    placeShipAt(ship, { x = -1, y = -1, isVertical = false } = {}) {
      if (!this.isReady() && isShipValid(ship, board, { x, y, isVertical })) {
        // place the fucking ship
        shipsCount += 1;
        return true;
      }
      return false;
    },
  };
};

export default createGameBoard;
