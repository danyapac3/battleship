import * as currentPlayerBoard from "./elements/current-player-board";
import * as currentEnemyBoard from "./elements/current-enemy-board";

export function update() {
  currentPlayerBoard.update();
  currentEnemyBoard.update();
}
