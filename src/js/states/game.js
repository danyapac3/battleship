import * as screen from "../screen";
import { hidePlayerBoard } from "../elements/boards";
import * as passDeviceToOpponentPopup from "../elements/pass-device-to-opponent-popup";
import * as gameOverPopup from "../elements/game-over-popup";

let players = [];
let currentPlayer = null;
let currentEnemy = null;

function getWinner() {
  const looser = players.find((player) => {
    const { ships } = player.gameboard;
    return ships.every((ship) => ship.isSunk());
  });

  if (!looser) {
    return null;
  }

  return looser === players[0] ? players[1] : players[0];
}

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
  currentEnemy = currentPlayer === players[0] ? players[1] : players[0];
}

// hits enemy board in specified coordinates and turns current player;
export async function playTurn(x, y) {
  try {
    currentEnemy.gameboard.hit(x, y);
  } catch (err) {
    return false;
  }

  const winner = getWinner();

  if (winner) {
    screen.update();
    gameOverPopup.show(winner.name);
    await gameOverPopup.waitClose();
  }

  hidePlayerBoard();
  // passDeviceToOpponentPopup.show();
  // await passDeviceToOpponentPopup.waitClose();
  togglePlayer();
  screen.update();
}
