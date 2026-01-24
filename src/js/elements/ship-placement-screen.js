import Ship from "../core/ship";
import Gameboard from "../core/gameboard";

const screenSelector = ".ship-placement-screen";
const boardSelector = screenSelector + "__board";
const shipsListSelector = screenSelector + "__ships-list";

const screen = document.querySelector(screenSelector);
const board = screen.querySelector(boardSelector);
const shipsList = screen.querySelector(shipsListSelector);

let elementToShip = new WeakMap();
let gameboard = null;
let prevFocusedShip = null;

function createCellElement(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.x = x;
  cell.dataset.y = y;
  return cell;
}

function createShipElement(ship) {
  const element = document.createElement("div");
  elementToShip.set(element, ship);
  element.classList.add("ship-placement-screen__ship");
  element.dataset.length = ship.length;
  element.tabIndex = 0;
  return element;
}

function getCellElementInPosition(board, x, y) {
  return board.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
}

function update(gameboard) {
  const { shipPositions } = gameboard;
  shipPositions.forEach((ship, x, y) => {
    const cellElement = getCellElementInPosition(board, x, y);

    cellElement.classList.toggle("ship", !!ship);
  });
}

export function init() {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      board.appendChild(createCellElement(x, y));
    }
  }

  update(new Gameboard());
  board.addEventListener("click", ({ target }) => {
    if (!target.classList.contains("cell") || !prevFocusedShip) {
      return;
    }

    const x = parseInt(target.dataset.x);
    const y = parseInt(target.dataset.y);
    const ship = elementToShip.get(prevFocusedShip);
    gameboard.placeShip(ship, x, y);
    update(gameboard);
  });
}

export async function waitGameboard() {
  gameboard = new Gameboard();
  const ships = [new Ship(1), new Ship(3)];
  shipsList.replaceChildren();
  ships.forEach((ship) => {
    const shipElement = createShipElement(ship);
    shipElement.addEventListener("focus", () => {
      prevFocusedShip = shipElement;
    });
    shipsList.appendChild(shipElement);
  });
  update(gameboard);
}
