import Ship from "../core/ship";
import Gameboard from "../core/gameboard";

const screenSelector = ".ship-placement-screen";
const boardSelector = screenSelector + "__board";
const shipsListSelector = screenSelector + "__ships-list";
const readyButtonSelector = screenSelector + "__ready-button";

const screen = document.querySelector(screenSelector);
const board = screen.querySelector(boardSelector);
const shipsList = screen.querySelector(shipsListSelector);
const readyButton = screen.querySelector(readyButtonSelector);

let elementToShip = new WeakMap();
let gameboard = null;
let prevFocusedShip = null;
let gameboardResolver = null;

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

function addShipToList(ship) {
  const shipElement = createShipElement(ship);
  shipElement.addEventListener("focus", () => {
    prevFocusedShip = shipElement;
  });
  shipsList.appendChild(shipElement);
}

function update(gameboard) {
  gameboard.forEachCell(({ x, y, ship }) => {
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
  board.addEventListener("mouseup", ({ target, button }) => {
    if (!target.classList.contains("cell")) {
      return;
    }

    const x = parseInt(target.dataset.x);
    const y = parseInt(target.dataset.y);

    if (button === 0 && prevFocusedShip) {
      const ship = elementToShip.get(prevFocusedShip);

      try {
        gameboard.placeShip(ship, x, y);
      } catch {
        return;
      }
      shipsList.removeChild(prevFocusedShip);
      prevFocusedShip = null;
    } else if (button === 2) {
      const ship = gameboard.getShipAt(x, y);
      if (!ship) {
        return;
      }
      gameboard.removeShip(ship);
      addShipToList(ship);
    }

    update(gameboard);
  });
  board.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  readyButton.addEventListener("click", () => {
    gameboardResolver?.(gameboard);
  });
}

export function show() {
  screen.hidden = false;
}

export function hide() {
  screen.hidden = true;
}

export function waitGameboard() {
  return new Promise((resolve) => {
    gameboardResolver = resolve;
    gameboard = new Gameboard();
    const ships = [new Ship(1), new Ship(3)];
    ships.forEach((ship) => addShipToList(ship));
    update(gameboard);
  });
}
