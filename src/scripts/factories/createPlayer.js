import { getRandomCord } from './createGameBoard';

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

// ! a dumb player who shoots in random places
const pcAttack = ({ player }) => {
  let attackInfo;
  let x;
  let y;

  do {
    x = getRandomCord();
    y = getRandomCord();
    attackInfo = player.receiveAttack({ x, y });
  } while (attackInfo === '*');

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
    attack,
    receiveAttack,
  };
};

export default createPlayer;
