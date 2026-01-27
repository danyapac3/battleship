export default class Game {
  #currentPlayer;
  #currentEnemy;
  constructor(player1, player2) {
    this.#currentPlayer = player1;
    this.#currentEnemy = player2;
  }

  getCurrentPlayer() {
    return this.#currentPlayer;
  }

  getCurrentEnemy() {
    return this.#currentEnemy;
  }

  togglePlayer() {
    [this.#currentEnemy, this.#currentPlayer] = [
      this.#currentPlayer,
      this.#currentEnemy,
    ];
  }

  getWinner() {
    const players = [this.#currentEnemy, this.#currentPlayer];
    const looser = players.find((player) => {
      const ships = player.gameboard.getShips();
      return ships.every((ship) => ship.isSunk());
    });

    if (!looser) {
      return null;
    }

    return looser === players[0] ? players[1] : players[0];
  }

  playRound(x, y) {
    try {
      this.#currentEnemy.gameboard.hit(x, y);
    } catch (err) {
      return false;
    }

    this.togglePlayer();
    return true;
  }
}
