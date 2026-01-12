import * as screen from "../screen";

let players = null;
let currentPlayer = null;
let currentEnemy = null;

export function init(player1, player2) {
  players = [player1, player2];
  currentPlayer = player1;
  currentEnemy = player2;
}

export function getPlayers() {
  return players;
}

export function getCurrentPlayer() {
  return currentPlayer;
}

export function getCurrentEnemy() {
  return currentPlayer === players[0] ? players[1] : players[0];
}

export function togglePlayer() {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  screen.update();
}
