import createGameBoard from '../createGameBoard';
import createShip from '../createShip';

//  '~' - water or an empty spot
//  'B' - border of ship
//  's' - ship itself
//  'x' - missed hi

// valid format for x and y: [0 - 9]

// todo report whether or not all ships have been sunk

describe('createGameBoard', () => {
  it('create a gameBoard with no ships', () => {
    expect(createGameBoard().isReady()).toBe(false);
  });

  it('return true if the ship was placed at A5', () => {
    const ship = createShip({ length: 1 });
    expect(createGameBoard().placeShipAt(ship, { x: 0, y: 5, position: 'vertical' })).toBe(true);
  });

  it('return false if cords are not in a valid format', () => {
    const ship = createShip({ length: 1 });
    expect(createGameBoard().placeShipAt(ship, { x: 'D', y: 'c', position: 'x' })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { x: '4', y: 4, position: 'x' })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { x: 4, y: '4', position: 'x' })).toBe(false);
  });

  it('return false if cords are not in a valid range', () => {
    const ship = createShip({ length: 3 });
    expect(createGameBoard().placeShipAt(ship, { x: 10, y: -12, position: 'vertical' })).toBe(
      false,
    );
  });

  it('position works with shorthands and is case insensitive', () => {
    const ship = createShip({ length: 1 });
    expect(createGameBoard().placeShipAt(ship, { x: 1, y: 0, position: 'v' })).toBe(true);
    expect(createGameBoard().placeShipAt(ship, { x: 0, y: 0, position: 'X' })).toBe(true);
    expect(createGameBoard().placeShipAt(ship, { x: 4, y: 0, position: 'veErTiCal' })).toBe(true);
  });

  it('return false if position is not valid', () => {
    const ship = createShip({ length: 1 });
    expect(createGameBoard().placeShipAt(ship, { x: 1, y: 0, position: 'diagonal' })).toBe(false);
  });

  it('work with default horizontal position if is not defined', () => {
    const ship = createShip({ length: 2 });
    const gameBoard = createGameBoard();
    expect(gameBoard.placeShipAt(ship, { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 0, y: 1 })).toBe(true);
  });

  it('return false if cords are not specified', () => {
    const ship = createShip({ length: 3 });
    expect(createGameBoard().placeShipAt(ship)).toBe(false);
    expect(createGameBoard().placeShipAt(ship, {})).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { x: 2 })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { y: 2 })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { position: 'y' })).toBe(false);
  });

  it('The ships cannot overlap', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 0 })).toBe(false);
  });

  it('The ships cannot stay side by side', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 1 })).toBe(false);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 2, y: 0 })).toBe(false);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 2 })).toBe(true);
  });

  it('The ships cannot be placed outside the board', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.placeShiptAt(createShip({ length: 3 }), { x: 7, y: 0 })).toBe(true);
    expect(gameBoard.placeShiptAt(createShip({ length: 3 }), { x: 8, y: 2 })).toBe(false);
    expect(gameBoard.placeShiptAt(createShip({ length: 4 }), { x: 0, y: 8, position: 'v' })).toBe(
      false,
    );
  });

  it('it can be only 1 ship with length = 4', () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 1, y: 1 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 6, y: 6 })).toBe(false);
  });

  it('it can be only 2 ships with length = 3', () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 4 })).toBe(false);
  });

  it('it can be only 3 ships with length = 2', () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 6 })).toBe(false);
  });

  it('it can be only 4 ships with length = 1', () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 0, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 0, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 0, y: 6 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 0, y: 8 })).toBe(false);
  });

  it('it can be 10 ships only on a board', () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.isReady()).toBe(false);
    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 6 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 8 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 5, y: 0 })).toBe(true);
    expect(gameBoard.isReady()).toBe(false);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 6 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 8 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 9, y: 0 })).toBe(false);
    expect(gameBoard.isReady()).toBe(true);
  });

  it('can take hits only when board is ready and return an object with required ships', () => {
    const gameBoard = createGameBoard();

    gameBoard.receiveAttack({ x: 0, y: 0 }).toEqual({
      ship4: 1,
      ship3: 2,
      ship2: 3,
      ship1: 4,
      message: 'Board needs 10 more ships',
    });

    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 0, y: 0 })).toBe(true);
    gameBoard.receiveAttack({ x: 0, y: 0 }).toEqual({
      ship3: 2,
      ship2: 3,
      ship1: 4,
      message: 'Board needs 9 more ships',
    });

    expect(gameBoard.isReady()).toBe(false);
  });

  it('place ships on random cords on board', () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.placeShipRandom(createShip({ length: 4 }))).toBe(true);
    expect(gameBoard.isReady()).toBe(false);
    expect(gameBoard.placeShipRandom(createShip({ length: 3 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 3 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 2 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 2 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 2 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 1 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 1 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 1 }))).toBe(true);
    expect(gameBoard.placeShipRandom(createShip({ length: 1 }))).toBe(true);
    expect(gameBoard.isReady()).toBe(true);
  });

  it('can take hits if board is ready and return true if is hit | false if is missed', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toEqual({
      ship4: 0,
      ship3: 2,
      ship2: 3,
      ship1: 4,
      message: 'Board needs 9 more ships',
    });

    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 6 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 8 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 5, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 6 })).toBe(true);

    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toEqual({
      ship4: 0,
      ship3: 0,
      ship2: 0,
      ship1: 1,
      message: 'Board needs 1 more ship',
    });

    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 5, y: 8 })).toBe(true);

    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 9, y: 0 })).toBe(false);
  });
});
