export const element = document.querySelector("#game-over");
export const okButton = element.querySelector(".popup__ok-button");
const text = element.querySelector(".popup__text");

let closeSubs = [];
let showSubs = [];

export function show(winnerName) {
  element.showModal();
  text.textContent = `Player ${winnerName} won! Would you like to play again?`;
  showSubs.forEach((sub) => sub());
  showSubs = [];
}

export function close() {
  element.close();
  closeSubs.forEach((sub) => sub());
  closeSubs = [];
}

export function waitClose() {
  return new Promise((resolve) => {
    closeSubs.push(resolve);
  });
}

export function waitShow() {
  return new Promise((resolve) => {
    showSubs.push(resolve);
  });
}
