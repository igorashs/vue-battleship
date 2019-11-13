import createGameBoard from '../createGameBoard';
import createShip from '../createShip';

// valid format for x and y: [0 - 9]

describe('createGameBoard', () => {
  it('create a gameBoard with no ships', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.isReady()).toBe(false);
    expect(gameBoard.isAllShipsSunk()).toBe(false);
    expect(gameBoard.getAliveShipsCount()).toBe(0);
  });

  it('return true if the ship was placed at A5 vertically and counted as alive', () => {
    const gameBoard = createGameBoard();
    const ship = createShip({ length: 1 });

    expect(gameBoard.placeShipAt(ship, { x: 0, y: 5, isVertical: true })).toBe(true);
    expect(gameBoard.getAliveShipsCount()).toBe(1);
  });

  it('return false if cords are not in a valid format', () => {
    const ship = createShip({ length: 1 });

    expect(createGameBoard().placeShipAt(ship, { x: 'D', y: 'c', isVertical: false })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { x: '4', y: 4, isVertical: false })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { x: 4, y: '4', isVertical: false })).toBe(false);
  });

  it('return false if cords are not in a valid range', () => {
    const ship = createShip({ length: 3 });

    expect(createGameBoard().placeShipAt(ship, { x: 10, y: -12, isVertical: true })).toBe(false);
  });

  it('work with default horizontal position if is not defined', () => {
    expect(createGameBoard().placeShipAt(createShip({ length: 2 }), { x: 0, y: 0 })).toBe(true);
  });

  it('return false if cords are not specified', () => {
    const ship = createShip({ length: 3 });

    expect(createGameBoard().placeShipAt(ship)).toBe(false);
    expect(createGameBoard().placeShipAt(ship, {})).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { x: 2 })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { y: 2 })).toBe(false);
    expect(createGameBoard().placeShipAt(ship, { isVertical: true })).toBe(false);
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

    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 8, y: 2 })).toBe(false);
    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 0, y: 8, isVertical: true })).toBe(
      false,
    );
  });

  it('it can be only 1 ship with length = 4', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 1, y: 1 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 5, y: 5 })).toBe(false);
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

  it('can take hits only when board is ready | return false', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe(false);

    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 0, y: 0 })).toBe(true);

    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe(false);

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
    expect(gameBoard.isAllShipsSunk()).toBe(false);
    expect(gameBoard.getAliveShipsCount()).toBe(10);
  });

  it('take hits when is board is ready | return true if it was hit | false if it was  missed | * if twice ', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe(false);

    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 6 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 8 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 6, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 6 })).toBe(true);

    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe(false);

    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 8 })).toBe(true);

    // attack in the same spot
    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe('*');

    expect(gameBoard.receiveAttack({ x: 9, y: 0 })).toBe(false);
  });

  it('return true if all ships have been sunk and alive ships should be 0', () => {
    const gameBoard = createGameBoard();

    expect(gameBoard.placeShipAt(createShip({ length: 4 }), { x: 0, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 3 }), { x: 0, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 6 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 0, y: 8 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 2 }), { x: 6, y: 0 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 2 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 4 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 6 })).toBe(true);
    expect(gameBoard.placeShipAt(createShip({ length: 1 }), { x: 6, y: 8 })).toBe(true);

    expect(gameBoard.isAllShipsSunk()).toBe(false);
    expect(gameBoard.getAliveShipsCount()).toBe(10);

    // sink 4len ship
    expect(gameBoard.receiveAttack({ x: 0, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 1, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 2, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 3, y: 0 }).ship.isSunk()).toBe(true);

    expect(gameBoard.isAllShipsSunk()).toBe(false);
    expect(gameBoard.getAliveShipsCount()).toBe(9);

    // sink 3len ships
    expect(gameBoard.receiveAttack({ x: 0, y: 2 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 1, y: 2 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 2, y: 2 }).ship.isSunk()).toBe(true);

    expect(gameBoard.receiveAttack({ x: 0, y: 4 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 1, y: 4 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 2, y: 4 }).ship.isSunk()).toBe(true);

    // sink 2len ships

    expect(gameBoard.receiveAttack({ x: 0, y: 6 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 1, y: 6 }).ship.isSunk()).toBe(true);

    expect(gameBoard.receiveAttack({ x: 0, y: 8 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 1, y: 8 }).ship.isSunk()).toBe(true);

    expect(gameBoard.receiveAttack({ x: 6, y: 0 })).toBe(true);
    expect(gameBoard.receiveAttack({ x: 7, y: 0 }).ship.isSunk()).toBe(true);

    // sink 1len ships
    expect(gameBoard.receiveAttack({ x: 6, y: 2 }).ship.isSunk()).toBe(true);
    expect(gameBoard.receiveAttack({ x: 6, y: 4 }).ship.isSunk()).toBe(true);
    expect(gameBoard.receiveAttack({ x: 6, y: 6 }).ship.isSunk()).toBe(true);
    expect(gameBoard.receiveAttack({ x: 6, y: 8 }).ship.isSunk()).toBe(true);

    expect(gameBoard.isAllShipsSunk()).toBe(true);
    expect(gameBoard.getAliveShipsCount()).toBe(0);
  });
});
