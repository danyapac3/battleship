export const element = document.querySelector("#pass-device-to-opponent");
export const okButton = element.querySelector(".popup__ok-button");

let closeSubs = [];
let showSubs = [];

export function show() {
  element.showModal();
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
