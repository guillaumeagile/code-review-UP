import { Game, SYMBOLS } from "./kata";

describe("TicTacToe game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test("should not allow player O to play first", () => {
    expect(() => {
      game.Play(SYMBOLS.O, 0, 0);
    }).toThrow();
  });

  it("should not allow player x to play twice in a row", () => {
    game.Play(SYMBOLS.X, 0, 0);
    expect(() => {
      game.Play(SYMBOLS.X, 1, 0);
    }).toThrow();
  });

  it("should not allow a player to play in last played position", () => {
    game.Play(SYMBOLS.X, 0, 0);
    expect(() => {
      game.Play(SYMBOLS.O, 0, 0);
    }).toThrow();
  });

  it("should not allow a player to play in any played position", () => {
    game.Play(SYMBOLS.X, 0, 0);
    game.Play(SYMBOLS.O, 1, 0);
    expect(() => {
      game.Play(SYMBOLS.X, 0, 0);
    }).toThrow();
  });

  it("should declare player X as winner if it plays three in top row", () => {
    game.Play(SYMBOLS.X, 0, 0);
    game.Play(SYMBOLS.O, 1, 0);
    game.Play(SYMBOLS.X, 0, 1);
    game.Play(SYMBOLS.O, 1, 1);
    game.Play(SYMBOLS.X, 0, 2);

    const winner = game.Winner();

    expect(winner).toBe(SYMBOLS.X);
  });

  it("should declare player O as winner if it plays three in top row", () => {
    game.Play(SYMBOLS.X, 1, 0);
    game.Play(SYMBOLS.O, 0, 0);
    game.Play(SYMBOLS.X, 1, 1);
    game.Play(SYMBOLS.O, 0, 1);
    game.Play(SYMBOLS.X, 2, 2);
    game.Play(SYMBOLS.O, 0, 2);

    const winner = game.Winner();

    expect(winner).toBe(SYMBOLS.O);
  });

  it("should declare player X as winner if it plays three in middle row", () => {
    game.Play(SYMBOLS.X, 1, 0);
    game.Play(SYMBOLS.O, 0, 0);
    game.Play(SYMBOLS.X, 1, 1);
    game.Play(SYMBOLS.O, 0, 1);
    game.Play(SYMBOLS.X, 1, 2);

    const winner = game.Winner();

    expect(winner).toBe(SYMBOLS.X);
  });

  it("should declare player O as winner if it plays three in middle row", () => {
    game.Play(SYMBOLS.X, 0, 0);
    game.Play(SYMBOLS.O, 1, 0);
    game.Play(SYMBOLS.X, 2, 1);
    game.Play(SYMBOLS.O, 1, 1);
    game.Play(SYMBOLS.X, 2, 2);
    game.Play(SYMBOLS.O, 1, 2);

    const winner = game.Winner();

    expect(winner).toBe(SYMBOLS.O);
  });

  it("should declare player X as winner if it plays three in bottom row", () => {
    game.Play(SYMBOLS.X, 2, 0);
    game.Play(SYMBOLS.O, 0, 0);
    game.Play(SYMBOLS.X, 2, 1);
    game.Play(SYMBOLS.O, 0, 1);
    game.Play(SYMBOLS.X, 2, 2);

    const winner = game.Winner();

    expect(winner).toBe(SYMBOLS.X);
  });

  it("should declare player O as winner if it plays three in bottom row", () => {
    game.Play(SYMBOLS.X, 0, 0);
    game.Play(SYMBOLS.O, 2, 0);
    game.Play(SYMBOLS.X, 1, 1);
    game.Play(SYMBOLS.O, 2, 1);
    game.Play(SYMBOLS.X, 0, 1);
    game.Play(SYMBOLS.O, 2, 2);

    const winner = game.Winner();

    expect(winner).toBe(SYMBOLS.O);
  });
});
