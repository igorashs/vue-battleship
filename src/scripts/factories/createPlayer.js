const getValidName = (name, isPc) => {
  if (!name && !isPc) {
    return 'Player';
  }

  if (!name && isPc) {
    return 'PC-Player';
  }

  return name;
};

const createPlayer = ({ name = '', board, isPc = false } = {}) => {
  if (!board) throw new Error('Player must have a board');
  if (!board.isReady()) throw new Error('Player must have a board with ships');

  const playerName = getValidName(name, isPc);
  const receiveAttack = board.receiveAttack.bind(board);

  return {
    getName: () => playerName,
    attack({ player, x, y }) {
      return player.receiveAttack({ x, y });
    },
    receiveAttack,
  };
};

export default createPlayer;
