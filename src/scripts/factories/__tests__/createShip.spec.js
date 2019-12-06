import createShip from '../createShip';

describe('createShip', () => {
  it('create a ship with length 3', () => {
    expect(createShip({ length: 3 }).getLength()).toBe(3);
  });

  it('return length = 4 if provided length > 4', () => {
    expect(createShip({ length: 8 }).getLength()).toBe(4);
  });

  it('return length = 1 if provided length < 1', () => {
    expect(createShip({ length: -23 }).getLength()).toBe(1);
  });

  it('new created ship should be healthy', () => {
    expect(createShip({ length: 3 }).isSunk()).toBe(false);
  });

  it('ship is sunk if the ship was destroyed', () => {
    expect(
      createShip({ length: 1 })
        .hitAt({ position: 1 })
        .isSunk(),
    ).toBe(true);
  });

  it('ship is not hit if position provided is too big or small', () => {
    const ship = createShip({ length: 1 });

    expect(
      ship
        .hitAt(40)
        .getLives()
        .join(''),
    ).toBe('');
    expect(
      ship
        .hitAt(0)
        .getLives()
        .join(''),
    ).toBe('');
  });

  it('a ship with 1 or more lives is not sunk', () => {
    const ship = createShip({ length: 4 });

    expect(ship.isSunk()).toBe(false);
    expect(ship.hitAt({ position: 1 }).isSunk()).toBe(false);
    expect(ship.hitAt({ position: 3 }).isSunk()).toBe(false);
    expect(ship.hitAt({ position: 2 }).isSunk()).toBe(false);
    expect(ship.hitAt({ position: 4 }).isSunk()).toBe(true);
  });

  it('alive ship has empty or undefined values in its lives array', () => {
    expect(
      createShip({ length: 3 })
        .hitAt({ position: 2 })
        .getLives()[0],
    ).toBeFalsy();
  });

  it('return an empty array if the ship is healthy', () => {
    expect(
      createShip({ length: 3 })
        .getLives()
        .join(''),
    ).toBe('');
  });

  it('return an array full of x equal with ship length if it was sunk', () => {
    const ship = createShip({ length: 2 });

    // 1x == total ship lives - 1
    expect(
      ship
        .hitAt({ position: 2 })
        .getLives()
        .join(''),
    ).toBe('x');

    expect(
      ship
        .hitAt({ position: 1 })
        .getLives()
        .join(''),
    ).toBe('xx');

    expect(ship.getLives().join('').length).toBe(ship.getLength());
  });
});
