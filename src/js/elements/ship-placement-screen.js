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
let filledBoardDeferred = null;
let activeGameboard = null;
let orientation = "horizontal";

let shipsState = (() => {
  let ships = new Set();
  let selectedShip = null;
  const elementToShip = new WeakMap();

  function updateElement() {
    const children = Array.from(ships)
      .sort((a, b) => b.length - a.length)
      .map((ship) => {
        const elm = createShipElement(ship);
        elementToShip.set(elm, ship);
        return elm;
      });

    shipsList.replaceChildren(...children);
  }

  function replaceItems(items) {
    ships = new Set(items);
    updateElement();
  }

  function add(item) {
    ships.add(item);
    updateElement();
  }

  function remove(item) {
    ships.delete(item);
    if (selectedShip === item) {
      unselectShip();
    }
    updateElement();
  }

  function clear() {
    ships.clear();
    unselectShip();
    updateElement();
  }

  function getSelectedShip() {
    return selectedShip;
  }

  function selectShip(ship) {
    if (ships.has(ship)) {
      selectedShip = ship;
    }
  }

  function unselectShip() {
    selectedShip = null;
  }

  function getShipByElement(elm) {
    return elementToShip.get(elm);
  }

  return {
    add,
    remove,
    clear,
    replaceItems,
    getShipByElement,
    getSelectedShip,
    selectShip,
    unselectShip,
  };
})();

let highlight = {
  inner_orientation: "horizontal",
  inner_length: 1,

  updateSizes() {
    const width =
      this.inner_orientation === "horizontal" ? this.inner_length : 1;
    const height =
      this.inner_orientation === "vertical" ? this.inner_length : 1;
    board.style.setProperty("--highlight-width", width);
    board.style.setProperty("--highlight-height", height);
  },

  show() {
    board.classList.add("highlighted");
  },

  hide() {
    board.classList.remove("highlighted");
  },

  set x(val) {
    board.style.setProperty("--highlight-x", val);
  },

  set y(val) {
    board.style.setProperty("--highlight-y", val);
  },

  set length(val) {
    this.inner_length = val;
    this.updateSizes();
  },

  set orientation(val) {
    this.inner_orientation = val;
    this.updateSizes();
  },
};

function createCellElement(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.x = x;
  cell.dataset.y = y;
  cell.style.setProperty("--x", x);
  cell.style.setProperty("--y", y);
  return cell;
}

function createShipElement(ship) {
  const element = document.createElement("div");
  element.classList.add("ship-placement-screen__ship");
  element.dataset.length = ship.length;
  element.tabIndex = 0;
  return element;
}

function getCellElementInPosition(board, x, y) {
  return board.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
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

  if (button === 0 && shipsState.getSelectedShip()) {
    const ship = shipsState.getSelectedShip();

    try {
      activeGameboard.placeShip(ship, x, y, orientation);
    } catch {
      return;
    }
    shipsState.remove(ship);
  } else if (button === 2) {
    const ship = activeGameboard.getShipAt(x, y);
    if (!ship) {
      return;
    }
    activeGameboard.removeShip(ship);
    shipsState.add(ship);
  }

  update(activeGameboard);
}

function cellOverHandler({ target }) {
  if (!target.classList.contains("cell")) {
    return;
  }

  const selectedShip = shipsState.getSelectedShip();

  if (!selectedShip) {
    return;
  }

  const x = parseInt(target.dataset.x);
  const y = parseInt(target.dataset.y);

  highlight.x = x;
  highlight.y = y;
  highlight.length = selectedShip.length;

  highlight.show();
}

export function init() {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      board.appendChild(createCellElement(x, y));
    }
  }

  board.addEventListener("mouseleave", () => highlight.hide());
  board.addEventListener("mouseup", cellClickHandler);
  board.addEventListener("mouseover", cellOverHandler);
  board.addEventListener("contextmenu", (e) => e.preventDefault());
  readyButton.addEventListener("click", () => filledBoardDeferred?.resolve());

  document.addEventListener("wheel", toggleOrientation);
  document.addEventListener("keyup", ({ key }) => {
    if (key === " ") {
      toggleOrientation();
    }
  });

  shipsList.addEventListener("click", ({ target }) => {
    if (target.classList.contains("ship-placement-screen__ship")) {
      const ship = shipsState.getShipByElement(target);
      shipsState.selectShip(ship);
    }
  });
}

export function toggleOrientation() {
  if (isShown) {
    orientation = orientation === "horizontal" ? "vertical" : "horizontal";
    highlight.orientation = orientation;
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
  filledBoardDeferred = null;
  activeGameboard = null;
  orientation = "horizontal";
  shipsState.clear();
}

export function waitFilledBoard(gameboard, ships) {
  cleanUp();
  if (!filledBoardDeferred) {
    filledBoardDeferred = createDeferredPromise();
    activeGameboard = gameboard;
    shipsState.replaceItems(ships);
    update(gameboard);
  }
  return filledBoardDeferred.promise.then(() => {
    cleanUp();
    return gameboard;
  });
}
