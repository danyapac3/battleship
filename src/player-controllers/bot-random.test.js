import RandomPlayerController from "./ai-random.js";
import Gameboard from "../gameboard.js";

const controller = new RandomPlayerController();
const board = new Gameboard();

describe("random-bot getHitPosition method", () => {
  test("Gives cell within board size", () => {
    const [x, y] = controller.getCellPosition(board);
    expect(x).toBeGreaterThanOrEqual(1);
    expect(x).toBeLessThenOrEqual(10);
    expect(y).toBeGreaterThanOrEqual(1);
    expect(y).toBeLessThenOrEqual(10);
  });

  test("Never picks cell that is already hit", () => {
    // hit all the board except the last cell
    for (let i = 0; i < 99; i++) {
      const x = (i % 10) + 1;
      const y = Math.floor(i / 10) + 1;
      board.hit(x, y);
    }
    expect(() => controller.getCellPosition()).toStrictEqual([10, 10]);
  });

  test("Takes full board", () => {
    board.hit(10, 10);
    expect(() => controller.getCellPosition()).toBe(null);
  });
});
