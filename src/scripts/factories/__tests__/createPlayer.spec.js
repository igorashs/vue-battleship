import createPlayer from '../createPlayer';
import createShip from '../createShip';
import createGameBoard from '../createGameBoard';

const createBoardWithPlacedShips = () => {
  const board = createGameBoard();

  board.placeShipAt(createShip({ length: 4 }), { x: 0, y: 0 });
  board.placeShipAt(createShip({ length: 3 }), { x: 0, y: 2 });
  board.placeShipAt(createShip({ length: 3 }), { x: 0, y: 4 });
  board.placeShipAt(createShip({ length: 2 }), { x: 0, y: 6 });
  board.placeShipAt(createShip({ length: 2 }), { x: 0, y: 8 });
  board.placeShipAt(createShip({ length: 2 }), { x: 6, y: 0 });
  board.placeShipAt(createShip({ length: 1 }), { x: 6, y: 2 });
  board.placeShipAt(createShip({ length: 1 }), { x: 6, y: 4 });
  board.placeShipAt(createShip({ length: 1 }), { x: 6, y: 6 });
  board.placeShipAt(createShip({ length: 1 }), { x: 6, y: 8 });

  board.setBoardToReady();

  return board;
};

describe('player', () => {
  it('create a player with name = Jora', () => {
    expect(createPlayer({ name: 'Jora', board: createBoardWithPlacedShips() }).getName()).toBe(
      'Jora',
    );
  });

  it('name = Player is the default', () => {
    expect(createPlayer({ board: createBoardWithPlacedShips() }).getName()).toBe('Player');
  });

  it('create a pc player with the default name = PC-Player', () => {
    const pcPlayer = createPlayer({ board: createBoardWithPlacedShips(), isPc: true });

    expect(pcPlayer.getName()).toBe('PC-Player');
  });

  it('a player must have a gameBoard with ships', () => {
    expect(() => {
      createPlayer();
    }).toThrow('Player must have a board');

    expect(() => {
      createPlayer({ board: createGameBoard() });
    }).toThrow('Player must have a board with ships');
  });

  it('return true if player hit a ship', () => {
    const board = createBoardWithPlacedShips();
    const player1 = createPlayer({ board });
    const player2 = createPlayer({ board });

    expect(player1.attack({ player: player2, x: 0, y: 0 })).toBe(true);
    expect(player1.attack({ player: player2, x: 9, y: 9 })).toBe(false);
  });

  it('return info about ship if it was sunk', () => {
    const board = createBoardWithPlacedShips();
    const player1 = createPlayer({ board });
    const player2 = createPlayer({ board });

    expect(player1.attack({ player: player2, x: 6, y: 8 })
      .damagedShipData.cords[0]).toEqual({ x: 6, y: 8 });
  });
});
