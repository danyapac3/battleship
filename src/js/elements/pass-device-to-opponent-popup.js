export const element = document.querySelector("#pass-device-to-opponent");
export const okButton = element.querySelector(".popup__ok-button");

let closeSubs = [];

export function show() {
  element.showModal();
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
