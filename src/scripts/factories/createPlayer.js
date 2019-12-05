import { getRandomCord, isCordsValid } from './createGameBoard';

const getValidName = (name, isPc) => {
  if (!name && !isPc) {
    return 'Player';
  }

  if (!name && isPc) {
    return 'PC-Player';
  }

  return name;
};

const playerAttack = ({ player, x, y }) => player.receiveAttack({ x, y });

const tracker = {
  isVertical: null,
  adjacentCords: null,
  backwardCord: null,
  forwardCord: null,
  initCord: null,
  damagedShipsCords: null,
  isBackWardFirst: null,
};

const pcAttack = ({ player }) => {
  let attackInfo;
  let x;
  let y;

  const makeBackwardAttack = () => {
    ({ x, y } = tracker.backwardCord);

    if (tracker.isVertical) {
      y -= 1;

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCords.find((c) => (c.x === x && c.y === y))) {
        y -= 1;
      }
    } else {
      x -= 1;

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCords.find((c) => (c.x === x && c.y === y))) {
        x -= 1;
      }
    }

    if (isCordsValid({ x, y })) {
      tracker.backwardCord = { x, y };
      attackInfo = player.receiveAttack({ x, y });

      if (attackInfo === true) {
        tracker.damagedShipsCords.push({ x, y });
      }
    } else {
      tracker.backwardCord = null;
      attackInfo = '*';
    }

    if (attackInfo === '*' || attackInfo === false) {
      tracker.backwardCord = null;
    }
  };

  const makeForwardAttack = () => {
    ({ x, y } = tracker.forwardCord);

    if (tracker.isVertical) {
      y += 1;

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCords.find((c) => (c.x === x && c.y === y))) {
        y += 1;
      }
    } else {
      x += 1;

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCords.find((c) => (c.x === x && c.y === y))) {
        x += 1;
      }
    }

    if (isCordsValid({ x, y })) {
      tracker.forwardCord = { x, y };
      attackInfo = player.receiveAttack({ x, y });

      if (attackInfo === true) {
        tracker.damagedShipsCords.push({ x, y });
      }
    } else {
      tracker.forwardCord = null;
      attackInfo = '*';
    }

    if (attackInfo === '*' || attackInfo === false) {
      tracker.forwardCord = null;
    }
  };

  do {
    if (tracker.adjacentCords) {
      const random = Math.floor(Math.random() * tracker.adjacentCords.length);
      ({ x, y } = tracker.adjacentCords[random]);
      attackInfo = player.receiveAttack({ x, y });

      if (attackInfo === true) {
        tracker.isVertical = tracker.initCord.y !== y;
        const { initCord } = tracker;

        tracker.backwardCord = { ...initCord };
        tracker.forwardCord = { ...initCord };
        tracker.isBackWardFirst = Math.floor(Math.random() * 2) === 1;

        tracker.damagedShipsCords.push({ x, y });
        tracker.adjacentCords = null;
      }
    } else if (tracker.backwardCord && (tracker.isBackWardFirst || !tracker.forwardCord)) {
      makeBackwardAttack();
    } else if (tracker.forwardCord && (!tracker.isBackWardFirst || !tracker.backwardCord)) {
      makeForwardAttack();
    } else {
      x = getRandomCord();
      y = getRandomCord();
      attackInfo = player.receiveAttack({ x, y });
    }
  } while (attackInfo === '*');

  if (attackInfo === true
    && !tracker.backwardCord
    && !tracker.forwardCord
    && !tracker.adjacentCords
  ) {
    tracker.initCord = { x, y };
    tracker.damagedShipsCords = [];
    tracker.adjacentCords = [];
    tracker.damagedShipsCords.push({ x, y });

    if (isCordsValid({ x: x - 1, y })) {
      tracker.adjacentCords.push({ x: x - 1, y });
    }

    if (isCordsValid({ x: x + 1, y })) {
      tracker.adjacentCords.push({ x: x + 1, y });
    }

    if (isCordsValid({ x, y: y - 1 })) {
      tracker.adjacentCords.push({ x, y: y - 1 });
    }

    if (isCordsValid({ x, y: y + 1 })) {
      tracker.adjacentCords.push({ x, y: y + 1 });
    }
  }

  if (attackInfo.damagedShipData) {
    tracker.isVertical = null;
    tracker.adjacentCords = null;
    tracker.backwardCord = null;
    tracker.forwardCord = null;
    tracker.initCord = null;
    tracker.damagedShipsCords = null;
    tracker.isBackWardFirst = null;
  }

  return { attackInfo, cord: { x, y } };
};

const createPlayer = ({ name = '', board, isPc = false } = {}) => {
  if (!board) throw new Error('Player must have a board');
  if (!board.isReady()) throw new Error('Player must have a board with ships');

  const playerName = getValidName(name, isPc);
  const receiveAttack = board.receiveAttack.bind(board);
  const attack = isPc ? pcAttack : playerAttack;

  return {
    getName: () => playerName,
    getBoard: () => ({ ...board }),
    attack,
    receiveAttack,
  };
};

export default createPlayer;
