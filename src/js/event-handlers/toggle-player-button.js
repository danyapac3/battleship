import * as gameState from "../states/game";

const toggleButton = document.querySelector(".toggle-player");

toggleButton.addEventListener("click", () => {
  gameState.togglePlayer();
});
