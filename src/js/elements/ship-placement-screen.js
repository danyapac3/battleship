import { createDeferredPromise } from "../utils/common";

const screenSelector = ".ship-placement-screen";
const boardSelector = screenSelector + "__board";
const shipsListSelector = screenSelector + "__ships-list";
const readyButtonSelector = screenSelector + "__ready-button";

const screen = document.querySelector(screenSelector);
const board = screen.querySelector(boardSelector);
const shipsList = screen.querySelector(shipsListSelector);
const readyButton = screen.querySelector(readyButtonSelector);

let isShown = false;
let elementToShip = new WeakMap();
let prevFocusedShip = null;
let filledBoardDeferred = null;
let activeGameboard = null;
let orientation = "horizontal";

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

function cellClickHandler({ target, button }) {
  if (!target.classList.contains("cell")) {
    return;
  }

  const x = parseInt(target.dataset.x);
  const y = parseInt(target.dataset.y);

  if (button === 0 && prevFocusedShip) {
    const ship = elementToShip.get(prevFocusedShip);

    try {
      activeGameboard.placeShip(ship, x, y, orientation);
    } catch {
      return;
    }
    shipsList.removeChild(prevFocusedShip);
    prevFocusedShip = null;
  } else if (button === 2) {
    const ship = activeGameboard.getShipAt(x, y);
    if (!ship) {
      return;
    }
    activeGameboard.removeShip(ship);
    addShipToList(ship);
  }

  update(activeGameboard);
}

export function init() {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      board.appendChild(createCellElement(x, y));
    }
  }

  board.addEventListener("mouseup", cellClickHandler);
  board.addEventListener("contextmenu", (e) => e.preventDefault());
  readyButton.addEventListener("click", () => filledBoardDeferred?.resolve());

  document.addEventListener("wheel", toggleOrientation);
  document.addEventListener("keyup", ({ key }) => {
    if (key === " ") {
      toggleOrientation();
    }
  });
}

export function toggleOrientation() {
  if (isShown) {
    orientation = orientation === "horizontal" ? "vertical" : "horizontal";
  }
}

export function show() {
  screen.hidden = false;
  isShown = true;
}

export function hide() {
  screen.hidden = true;
  isShown = false;
}

export function cleanUp() {
  prevFocusedShip = null;
  filledBoardDeferred = null;
  activeGameboard = null;
  orientation = "horizontal";
  shipsList.replaceChildren();
}

export function waitFilledBoard(gameboard, ships) {
  if (!filledBoardDeferred) {
    filledBoardDeferred = createDeferredPromise();
    activeGameboard = gameboard;
    ships.forEach((ship) => addShipToList(ship));
    update(gameboard);
  }
  return filledBoardDeferred.promise.then(() => {
    cleanUp();
    return gameboard;
  });
}
