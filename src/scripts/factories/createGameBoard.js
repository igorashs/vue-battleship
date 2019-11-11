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

const isShipValid = (ship, [...board], { x, y, isVertical }) => {
  if (ship && isCordsValid({ x, y })) {
    const startPoint = { x, y };
    const endPoint = isVertical ? { x, y: y + ship.getLength() } : { x: x + ship.getLength(), y };

    if (isCordsValid(endPoint)) {
      return true;
    }
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
