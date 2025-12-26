import RandomPlayerController from "./ai-random.js";
import Gameboard from "../gameboard.js";

const controller = new RandomPlayerController();
const board = new Gameboard();

describe("random-bot getHitPosition method", () => {
  test("Gives cell within board size", async () => {
    const [x, y] = await controller.getCellPosition(board);
    expect(x).toBeGreaterThanOrEqual(1);
    expect(x).toBeLessThenOrEqual(10);
    expect(y).toBeGreaterThanOrEqual(1);
    expect(y).toBeLessThenOrEqual(10);
  });

  test("Never picks cell that is already hit", async () => {
    // hit all the board except the last cell
    for (let i = 0; i < 99; i++) {
      const x = (i % 10) + 1;
      const y = Math.floor(i / 10) + 1;
      board.hit(x, y);
    }
    await expect(() => controller.getCellPosition()).resolves.toStrictEqual([
      10, 10,
    ]);
  });

  test("Takes full board", async () => {
    board.hit(10, 10);
    await expect(() => controller.getCellPosition()).resolves.toBe(null);
  });
});
