import Ship from "../core/ship";

const screenSelector = ".ship-placement-screen";
const boardSelector = screenSelector + "__board";
const shipsListSelector = screenSelector + "__ships-list";

const screen = document.querySelector(screenSelector);
const board = screen.querySelector(boardSelector);
const shipsList = screen.querySelector(shipsListSelector);

function createCellElement(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.x = x;
  cell.dataset.y = y;
  return cell;
}

function createShipElement(length) {
  const ship = document.createElement("div");
  ship.classList.add("ship-placement-screen__ship");
  ship.dataset.length = length;
  return ship;
}

export function init() {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      board.appendChild(createCellElement(x, y));
    }
  }

  board.addEventListener("click", () => {});
}

export async function waitGameboard() {
  const ships = [new Ship(1), new Ship(3), new Ship(1)];
  ships.forEach((ship) => {
    shipsList.appendChild(createShipElement(ship.length));
  });
}
