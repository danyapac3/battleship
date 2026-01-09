import { HitSameCellError } from "./gameboard";

export default class Game {
  #players;

  constructor(player1, player2) {
    this.#players = [player1, player2];
    this.currentPlayer = player1;
  }

  #toggleCurrentPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.#players[0]
        ? this.#players[1]
        : this.#players[0];
  }

  playTurn(x, y) {
    try {
      this.currentPlayer.gameboard.hit(x, y);
    } catch (err) {
      if (!(err instanceof HitSameCellError)) {
        throw err;
      }
      return false;
    }
    this.#toggleCurrentPlayer();
    return true;
  }
}
