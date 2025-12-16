export class Player {
  constructor(name, gameboard, playerController) {
    this.name = name;
    this.gameboard = gameboard;
    this.playerController = playerController;
  }

  async hitBoard(opponentBoard) {
    opponentBoard.hit(await playerController.getHitPossition(opponentBoard));
  }
}
